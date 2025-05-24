import { TransactionEntity } from 'src/entities/transaction.entity'

export const Transactions = Symbol('Transactions')

export type TransactionsSearchParams = {
  userId: string
  take: number
  skip: number
}

export interface Transactions {
  save(transaction: TransactionEntity): Promise<TransactionEntity>
  findByIdOrFail(id: string): Promise<TransactionEntity>
  search(params: TransactionsSearchParams): Promise<{
    transactions: Array<TransactionEntity>
    total: number
  }>
}
