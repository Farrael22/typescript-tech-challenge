import { Inject, UnprocessableEntityException } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { TransactionEventType } from 'src/entities/enums/transactions-event-type.enum'
import { TransactionCreatedEventData } from 'src/entities/enums/transactions-event-type.enum'
import { UserEntity } from 'src/entities/user.entity'
import { Refunding } from 'src/transactions/domains/refundings/refunding.domain'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { isFailure } from 'src/types/result.types'

export class CreateRefundTransactionUseCase {
  constructor(
    @Inject(Transactions) private readonly transactions: Transactions,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(originalTransactionId: string, requester: UserEntity) {
    const originalTransaction = await this.transactions.findByIdOrFail(originalTransactionId)

    const refunding = new Refunding(originalTransaction, requester)

    const result = refunding.execute()

    if (isFailure(result)) {
      throw new UnprocessableEntityException(result.error)
    }

    const savedTransaction = await this.transactions.save(result.data)

    const eventData: TransactionCreatedEventData = {
      transactionId: savedTransaction.id,
      requesterId: requester.id,
    }
    this.eventEmitter.emit(TransactionEventType.Created, eventData)

    return savedTransaction
  }
}
