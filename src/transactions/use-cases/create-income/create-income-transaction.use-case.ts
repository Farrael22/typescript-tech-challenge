import { Inject } from '@nestjs/common'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { CreateIncomeTransactionDto } from 'src/transactions/dtos/create-income-transaction.dto'
import { TransactionsFactory } from 'src/transactions/factories/transactions.factory'

export class CreateIncomeTransactionUseCase {
  constructor(@Inject(Transactions) private readonly transactions: Transactions) {}

  execute(createIncomeTransactionDto: CreateIncomeTransactionDto) {
    const transaction = TransactionsFactory.createIncome(createIncomeTransactionDto)
    return this.transactions.save(transaction)
  }
}
