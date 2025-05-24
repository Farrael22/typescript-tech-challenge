import { Mock } from 'src/test.utils'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { CreateRefundTransactionUseCase } from './create-refund-transaction.use-case'
import { UserEntity } from 'src/entities/user.entity'
import { TransactionEntity } from 'src/entities/transaction.entity'
import { UnprocessableEntityException } from '@nestjs/common'
import { TransactionType } from 'src/entities/enums/transaction-type.enum'

describe('CreateIncomeTransactionUseCase', () => {
  const transactions = Mock<Transactions>({
    findByIdOrFail: jest.fn(),
    save: jest.fn(),
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

    beforeAll(async () => {
      transactions.findByIdOrFail = jest.fn().mockResolvedValue(originalTransaction)

      const useCase = new CreateRefundTransactionUseCase(transactions)
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

        useCase = new CreateRefundTransactionUseCase(transactions)
      })

      it('throws an unprocessable entity exception', async () => {
        expect(useCase.execute('transaction-id', requester)).rejects.toThrow(
          UnprocessableEntityException,
        )
      })
    })
  })
})
