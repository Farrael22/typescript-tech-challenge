import { Inject } from '@nestjs/common'
import { UserEntity } from 'src/entities/user.entity'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { FetchTransactionsQuery } from 'src/transactions/dtos/fetch-transactions/fetch-transactions.dto'

export class FetchTransactionsUseCase {
  constructor(@Inject(Transactions) private readonly transactions: Transactions) {}

  execute(requester: UserEntity, query: FetchTransactionsQuery) {
    return this.transactions.search({
      userId: requester.id,
      take: query.take,
      skip: query.skip,
      type: query.type,
    })
  }
}
