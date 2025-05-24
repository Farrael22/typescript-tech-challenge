export enum Queues {
  BalanceConsolidations = 'balance:consolidations',
}

export class QueuesOptions {
  static readonly [Queues.BalanceConsolidations] = {
    attempts: 9,
    backoff: { type: 'exponential', delay: 5000 },
    delay: 5000,
  }
}
