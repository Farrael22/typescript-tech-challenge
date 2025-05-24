import { Type } from 'class-transformer'
import { IsOptional, Min } from 'class-validator'
import { format } from 'date-fns'
import { TransactionEntity } from 'src/entities/transaction.entity'
import { Money } from 'src/utils/money'

export class FetchTransactionsQuery {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  take = 10

  @Type(() => Number)
  @Min(0)
  skip: number
}

export class FetchTransactionsResponse {
  constructor(
    public readonly transactions: Array<TransactionEntity>,
    public readonly total: number,
    public readonly query: FetchTransactionsQuery,
  ) {}

  toJSON() {
    return {
      transactions: this.transactions.map((transaction) => ({
        id: transaction.id,
        amount: Money.fromMagnified(transaction.magnifiedAmount),
        description: transaction.description,
        type: transaction.type,
        createdAt: format(transaction.createdAt, 'MMMM dd, yyyy'),
      })),
      hasMore: this.query.skip + this.query.take < this.total,
    }
  }
}
