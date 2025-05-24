import { Processor, Process, InjectQueue } from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { Queues, QueuesOptions } from 'src/entities/enums/queues.enum'
import { ConsolidateBalanceUseCase } from '../use-cases/consolidate-balance.use-case'

@Processor(Queues.BalanceConsolidations)
export class BalanceConsolidationsConsumer {
  constructor(
    @InjectQueue(Queues.BalanceConsolidations)
    private readonly queue: Queue<{ transactionId: string; requesterId: string }>,
    private readonly consolidateBalance: ConsolidateBalanceUseCase,
  ) {}

  @Process()
  async handle(job: Job<{ transactionId: string; requesterId: string }>) {
    const { transactionId, requesterId } = job.data
    await this.consolidateBalance.execute(transactionId, requesterId)
  }

  enqueue(transactionId: string, requesterId: string) {
    return this.queue.add(
      { transactionId, requesterId },
      QueuesOptions[Queues.BalanceConsolidations],
    )
  }
}
