import { TransactionType } from 'src/entities/enums/transaction-type.enum'
import { TransactionEntity } from 'src/entities/transaction.entity'
import { UserEntity } from 'src/entities/user.entity'
import { Money } from 'src/utils/money'

export class TransactionsFactory {
  static createIncome({
    amount,
    description,
    requester,
  }: {
    amount: number
    description: Optional<string>
    requester: UserEntity
  }) {
    return new TransactionEntity({
      userId: requester.id,
      magnifiedAmount: Money.toMagnified(amount),
      description,
    })
  }

  static createRefund({
    originalTransaction,
    requester,
  }: {
    originalTransaction: TransactionEntity
    requester: UserEntity
  }) {
    return new TransactionEntity({
      userId: requester.id,
      magnifiedAmount: originalTransaction.magnifiedAmount,
      description: `Refund for transaction ${originalTransaction.id}`,
      originalTransactionId: originalTransaction.id,
      type: TransactionType.Refund,
    })
  }
}
