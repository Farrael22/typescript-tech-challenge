import { Mock } from 'src/test.utils'
import { UserEntity } from './user.entity'
import { TransactionType } from './enums/transaction-type.enum'
import { TransactionEntity } from './transaction.entity'

describe('UserEntity', () => {
  describe('#consolidateBalance', () => {
    const transaction = Mock<TransactionEntity>({
      type: TransactionType.Income,
      magnifiedAmount: 10000,
    })

    describe('when income transaction is received', () => {
      it('increases the balance', () => {
        const user = new UserEntity({
          magnifiedBalance: 0,
        })
        user.consolidateBalance(transaction)

        expect(user.magnifiedBalance).toBe(10000)
      })
    })

    describe('when expense transaction is received', () => {
      const transaction = Mock<TransactionEntity>({
        type: TransactionType.Expense,
        magnifiedAmount: 10000,
      })

      it('decreases the balance', () => {
        const user = new UserEntity({
          magnifiedBalance: 10000,
        })
        user.consolidateBalance(transaction)

        expect(user.magnifiedBalance).toBe(0)
      })
    })

    describe('when refund transaction is received', () => {
      const transaction = Mock<TransactionEntity>({
        type: TransactionType.Refund,
        magnifiedAmount: 10000,
      })

      it('increases the balance', () => {
        const user = new UserEntity({
          magnifiedBalance: 10000,
        })
        user.consolidateBalance(transaction)

        expect(user.magnifiedBalance).toBe(20000)
      })
    })
  })
})
