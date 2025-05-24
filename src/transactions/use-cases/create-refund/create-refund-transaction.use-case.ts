import { Inject, UnprocessableEntityException } from '@nestjs/common'
import { UserEntity } from 'src/entities/user.entity'
import { Refunding } from 'src/transactions/domains/refundings/refunding.domain'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { isFailure } from 'src/types/result.types'

export class CreateRefundTransactionUseCase {
  constructor(@Inject(Transactions) private readonly transactions: Transactions) {}

  async execute(originalTransactionId: string, requester: UserEntity) {
    const originalTransaction = await this.transactions.findByIdOrFail(originalTransactionId)

    const refunding = new Refunding(originalTransaction, requester)

    const result = refunding.execute()

    if (isFailure(result)) {
      throw new UnprocessableEntityException(result.error)
    }

    return this.transactions.save(result.data)
  }
}
