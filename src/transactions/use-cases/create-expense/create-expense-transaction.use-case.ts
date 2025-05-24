import { Inject } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
  TransactionCreatedEventData,
  TransactionEventType,
} from 'src/entities/enums/transactions-event-type.enum'
import { UserEntity } from 'src/entities/user.entity'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { CreateTransactionDto } from 'src/transactions/dtos/create-income-transaction.dto'
import { TransactionsFactory } from 'src/transactions/factories/transactions.factory'

export class CreateExpenseTransactionUseCase {
  constructor(
    @Inject(Transactions) private readonly transactions: Transactions,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(payload: CreateTransactionDto, requester: UserEntity) {
    const transaction = TransactionsFactory.createExpense({
      requester,
      amount: payload.amount,
      description: payload.description,
    })
    const savedTransaction = await this.transactions.save(transaction)

    const eventData: TransactionCreatedEventData = {
      transactionId: savedTransaction.id,
      requesterId: requester.id,
    }
    this.eventEmitter.emit(TransactionEventType.Created, eventData)

    return savedTransaction
  }
}
