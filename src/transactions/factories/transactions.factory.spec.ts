import { TransactionEntity } from 'src/entities/transaction.entity'
import { TransactionsFactory } from './transactions.factory'
import { Mock } from 'src/test.utils'
import { UserEntity } from 'src/entities/user.entity'
import { TransactionType } from 'src/entities/enums/transaction-type.enum'

describe('TransactionsFactory', () => {
  const requester = Mock<UserEntity>({
    id: 'user-id',
  })

  describe('#createIncome', () => {
    it('returns a transaction entity', () => {
      const transaction = TransactionsFactory.createIncome({
        requester,
        amount: 100,
        description: 'description',
      })

      expect(transaction).toStrictEqual(
        new TransactionEntity({
          userId: 'user-id',
          magnifiedAmount: 1000000,
          description: 'description',
        }),
      )
    })
  })

  describe('#createRefund', () => {
    const originalTransaction = Mock<TransactionEntity>({
      id: 'transaction-id',
      magnifiedAmount: 1000000,
      description: 'description',
    })

    it('returns a transaction entity', () => {
      const transaction = TransactionsFactory.createRefund({
        originalTransaction,
        requester,
      })

      expect(transaction).toStrictEqual(
        new TransactionEntity({
          userId: 'user-id',
          magnifiedAmount: 1000000,
          description: 'Refund for transaction transaction-id',
          originalTransactionId: 'transaction-id',
          type: TransactionType.Refund,
        }),
      )
    })
  })

  describe('#createExpense', () => {
    it('returns a transaction entity', () => {
      const transaction = TransactionsFactory.createExpense({
        requester,
        amount: 100,
        description: 'description',
      })

      expect(transaction).toStrictEqual(
        new TransactionEntity({
          userId: 'user-id',
          magnifiedAmount: 1000000,
          description: 'description',
          type: TransactionType.Expense,
        }),
      )
    })
  })
})
