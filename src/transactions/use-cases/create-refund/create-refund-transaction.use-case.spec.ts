import { Mock } from 'src/test.utils'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { CreateRefundTransactionUseCase } from './create-refund-transaction.use-case'
import { UserEntity } from 'src/entities/user.entity'
import { TransactionEntity } from 'src/entities/transaction.entity'
import { UnprocessableEntityException } from '@nestjs/common'
import { TransactionType } from 'src/entities/enums/transaction-type.enum'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { TransactionEventType } from 'src/entities/enums/transactions-event-type.enum'

describe('CreateIncomeTransactionUseCase', () => {
  const transactions = Mock<Transactions>({
    findByIdOrFail: jest.fn(),
    save: jest.fn(),
  })
  const emitter = Mock<EventEmitter2>({
    emit: jest.fn(),
  })

  describe('#execute', () => {
    const originalTransaction = Mock<TransactionEntity>({
      id: 'transaction-id',
      magnifiedAmount: 1000000,
      description: 'description',
    })
    const requester = Mock<UserEntity>({
      id: 'user-id',
    })
    const savedTransaction = Mock<TransactionEntity>({
      id: 'transaction-id',
    })

    beforeAll(async () => {
      transactions.findByIdOrFail = jest.fn().mockResolvedValue(originalTransaction)
      transactions.save = jest.fn().mockResolvedValue(savedTransaction)

      const useCase = new CreateRefundTransactionUseCase(transactions, emitter)
      await useCase.execute('transaction-id', requester)
    })

    it('finds the original transaction', () => {
      expect(transactions.findByIdOrFail).toHaveBeenCalledWith('transaction-id')
    })

    it('saves a transaction', () => {
      expect(transactions.save).toHaveBeenCalledWith({
        userId: 'user-id',
        magnifiedAmount: 1000000,
        type: TransactionType.Refund,
        originalTransactionId: 'transaction-id',
        description: 'Refund for transaction transaction-id',
      })
    })

    it('emits a transaction created event', () => {
      expect(emitter.emit).toHaveBeenCalledWith(TransactionEventType.Created, {
        transactionId: 'transaction-id',
        requesterId: 'user-id',
      })
    })

    describe('when the refunding fails', () => {
      const transactionWithRefund = Mock<TransactionEntity>({
        id: 'transaction-id',
        magnifiedAmount: 1000000,
        description: 'description',
        hasRefund: true,
      })

      let useCase: CreateRefundTransactionUseCase

      beforeAll(() => {
        jest.clearAllMocks()
        transactions.findByIdOrFail = jest.fn().mockResolvedValue(transactionWithRefund)

        useCase = new CreateRefundTransactionUseCase(transactions, emitter)
      })

      it('throws an unprocessable entity exception', async () => {
        expect(useCase.execute('transaction-id', requester)).rejects.toThrow(
          UnprocessableEntityException,
        )
      })
    })
  })
})
