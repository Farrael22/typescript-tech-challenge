import { Mock } from 'src/test.utils'
import { BalanceConsolidationsConsumer } from '../consumers/balance-consolidations.consumer'
import { TransactionsListener } from './transactions.listener'

describe('TransactionsListener', () => {
  const balanceConsolidationsConsumer = Mock<BalanceConsolidationsConsumer>({
    enqueue: jest.fn(),
  })

  describe('#handler', () => {
    beforeAll(async () => {
      const listener = new TransactionsListener(balanceConsolidationsConsumer)
      await listener.handler({ transactionId: 'transaction-id', requesterId: 'user-id' })
    })

    it('enqueues the transaction', () => {
      expect(balanceConsolidationsConsumer.enqueue).toHaveBeenCalledWith(
        'transaction-id',
        'user-id',
      )
    })
  })
})
