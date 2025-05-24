import { TransactionEntity } from 'src/entities/transaction.entity'
import { UserEntity } from 'src/entities/user.entity'
import { TransactionsFactory } from 'src/transactions/factories/transactions.factory'
import { Result, success, failure } from 'src/types/result.types'

export class Refunding {
  constructor(
    private readonly originalTransaction: TransactionEntity,
    private readonly requester: UserEntity,
  ) {}

  execute(): Result<TransactionEntity> {
    if (this.originalTransaction.hasRefund) {
      return failure('Refund already exists')
    }

    const transaction = TransactionsFactory.createRefund({
      requester: this.requester,
      originalTransaction: this.originalTransaction,
    })

    return success(transaction)
  }
}
