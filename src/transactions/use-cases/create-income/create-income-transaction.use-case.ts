import { Inject } from '@nestjs/common'
import { UserEntity } from 'src/entities/user.entity'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { CreateIncomeTransactionDto } from 'src/transactions/dtos/create-income-transaction.dto'
import { TransactionsFactory } from 'src/transactions/factories/transactions.factory'

export class CreateIncomeTransactionUseCase {
  constructor(@Inject(Transactions) private readonly transactions: Transactions) {}

  execute(payload: CreateIncomeTransactionDto, requester: UserEntity) {
    const transaction = TransactionsFactory.createIncome({
      requester,
      amount: payload.amount,
      description: payload.description,
    })
    return this.transactions.save(transaction)
  }
}
