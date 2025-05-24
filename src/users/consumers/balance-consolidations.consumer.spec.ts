import { Mock } from 'src/test.utils'
import { BalanceConsolidationsConsumer } from './balance-consolidations.consumer'
import { Job, Queue } from 'bull'
import { ConsolidateBalanceUseCase } from '../use-cases/consolidate-balance.use-case'
import { Queues, QueuesOptions } from 'src/entities/enums/queues.enum'

describe('BalanceConsolidationsConsumer', () => {
  const queue = Mock<Queue>({
    add: jest.fn(),
  })
  const consolidateBalance = Mock<ConsolidateBalanceUseCase>({
    execute: jest.fn(),
  })

  describe('#handle', () => {
    const job = Mock<Job>({
      data: { transactionId: 'transaction-id', requesterId: 'user-id' },
    })

    beforeAll(async () => {
      const consumer = new BalanceConsolidationsConsumer(queue, consolidateBalance)
      await consumer.handle(job)
    })

    it('consolidates the balance', () => {
      expect(consolidateBalance.execute).toHaveBeenCalledWith('transaction-id', 'user-id')
    })
  })

  describe('#enqueue', () => {
    beforeAll(async () => {
      const consumer = new BalanceConsolidationsConsumer(queue, consolidateBalance)
      await consumer.enqueue('transaction-id', 'user-id')
    })

    it('enqueues the job', () => {
      expect(queue.add).toHaveBeenCalledWith(
        {
          transactionId: 'transaction-id',
          requesterId: 'user-id',
        },
        QueuesOptions[Queues.BalanceConsolidations],
      )
    })
  })
})
