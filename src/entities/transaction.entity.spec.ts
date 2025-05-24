import { TransactionEntity } from './transaction.entity'

describe('TransactionEntity', () => {
  describe('#hasRefund', () => {
    it('returns true if the transaction has a refund', () => {
      const transaction = new TransactionEntity({
        refundTransaction: new TransactionEntity({}),
      })

      expect(transaction.hasRefund).toBe(true)
    })

    describe('when the transaction does not have a refund', () => {
      it('returns false', () => {
        const transaction = new TransactionEntity({})

        expect(transaction.hasRefund).toBe(false)
      })
    })
  })
})
