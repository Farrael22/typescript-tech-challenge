import { TransactionEntity } from 'src/entities/transaction.entity'
import { Refunding } from './refunding.domain'
import { Mock } from 'src/test.utils'
import { UserEntity } from 'src/entities/user.entity'
import { failure, success } from 'src/types/result.types'
import { TransactionType } from 'src/entities/enums/transaction-type.enum'

describe('Refunding', () => {
  describe('#execute', () => {
    const originalTransaction = Mock<TransactionEntity>({
      id: 'transaction-id',
      magnifiedAmount: 1000000,
      description: 'description',
    })
    const requester = Mock<UserEntity>({
      id: 'user-id',
    })

    it('returns a transaction entity', () => {
      const refunding = new Refunding(originalTransaction, requester)

      const result = refunding.execute()

      expect(result).toStrictEqual(
        success(
          new TransactionEntity({
            userId: 'user-id',
            magnifiedAmount: 1000000,
            description: 'Refund for transaction transaction-id',
            originalTransactionId: 'transaction-id',
            type: TransactionType.Refund,
          }),
        ),
      )
    })

    describe('when the original transaction has a refund', () => {
      const originalTransactionWithRefund = Mock<TransactionEntity>({
        id: 'transaction-id',
        magnifiedAmount: 1000000,
        description: 'description',
        hasRefund: true,
      })

      it('returns the refund already exists error', () => {
        const refunding = new Refunding(originalTransactionWithRefund, requester)

        const result = refunding.execute()

        expect(result).toStrictEqual(failure('Refund already exists'))
      })
    })
  })
})
