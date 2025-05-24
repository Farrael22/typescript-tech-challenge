export enum TransactionEventType {
  Created = 'transaction:created',
}

export type TransactionCreatedEventData = {
  transactionId: string
  requesterId: string
}
