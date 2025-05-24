import { Mock } from 'src/test.utils'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { CreateIncomeTransactionUseCase } from './create-income-transaction.use-case'
import { UserEntity } from 'src/entities/user.entity'
import { CreateTransactionDto } from 'src/transactions/dtos/create-income-transaction.dto'
import EventEmitter2 from 'eventemitter2'
import { TransactionEventType } from 'src/entities/enums/transactions-event-type.enum'
import { TransactionEntity } from 'src/entities/transaction.entity'

describe('CreateIncomeTransactionUseCase', () => {
  const transactions = Mock<Transactions>({
    save: jest.fn(),
  })
  const emitter = Mock<EventEmitter2>({
    emit: jest.fn(),
  })

  describe('#execute', () => {
    const requester = Mock<UserEntity>({
      id: 'user-id',
    })
    const payload = Mock<CreateTransactionDto>({
      amount: 100,
      description: 'description',
    })
    const savedTransaction = Mock<TransactionEntity>({
      id: 'transaction-id',
    })

    beforeEach(async () => {
      transactions.save = jest.fn().mockResolvedValue(savedTransaction)

      const useCase = new CreateIncomeTransactionUseCase(transactions, emitter)
      await useCase.execute(payload, requester)
    })

    it('saves a transaction', () => {
      expect(transactions.save).toHaveBeenCalledWith({
        userId: 'user-id',
        magnifiedAmount: 1000000,
        description: 'description',
      })
    })

    it('emits a transaction created event', () => {
      expect(emitter.emit).toHaveBeenCalledWith(TransactionEventType.Created, {
        transactionId: 'transaction-id',
        requesterId: 'user-id',
      })
    })
  })
})
