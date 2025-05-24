import { TransactionEntity } from 'src/entities/transaction.entity'

export const Transactions = Symbol('Transactions')

export interface Transactions {
  save(transaction: TransactionEntity): Promise<TransactionEntity>
}
