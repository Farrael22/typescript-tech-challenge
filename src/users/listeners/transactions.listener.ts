import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
  TransactionCreatedEventData,
  TransactionEventType,
} from 'src/entities/enums/transactions-event-type.enum'
import { BalanceConsolidationsConsumer } from '../consumers/balance-consolidations.consumer'

@Injectable()
export class TransactionsListener {
  constructor(private readonly balanceConsolidationsConsumer: BalanceConsolidationsConsumer) {}

  @OnEvent(TransactionEventType.Created, { async: true })
  async handler({ transactionId, requesterId }: TransactionCreatedEventData) {
    await this.balanceConsolidationsConsumer.enqueue(transactionId, requesterId)
  }
}
