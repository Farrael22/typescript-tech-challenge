import { TransactionEntity } from 'src/entities/transaction.entity'
import { TransactionsFactory } from './transactions.factory'
import { Mock } from 'src/test.utils'
import { UserEntity } from 'src/entities/user.entity'

describe('TransactionsFactory', () => {
  describe('#createIncome', () => {
    const requester = Mock<UserEntity>({
      id: 'user-id',
    })

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
})
