import { TransactionEntity } from 'src/entities/transaction.entity'
import { Money } from 'src/utils/money'

export class TransactionsFactory {
  static createIncome({
    userId,
    amount,
    description,
  }: {
    userId: string
    amount: number
    description: Optional<string>
  }) {
    return new TransactionEntity({
      userId,
      magnifiedAmount: Money.toMagnified(amount),
      description,
    })
  }
}
