import { TransactionEntity } from 'src/entities/transaction.entity'
import { TransactionsFactory } from './transactions.factory'

describe('TransactionsFactory', () => {
  describe('#createIncome', () => {
    it('returns a transaction entity', () => {
      const transaction = TransactionsFactory.createIncome({
        userId: 'user-id',
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
})
