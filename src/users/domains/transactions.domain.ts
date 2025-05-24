import { TransactionEntity } from 'src/entities/transaction.entity'

export const Transactions = Symbol('Transactions')

export interface Transactions {
  findByIdOrFail(id: string): Promise<TransactionEntity>
}
