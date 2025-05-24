import { Module } from '@nestjs/common'
import { TransactionsController } from './controllers/transactions.controller'
import { CreateIncomeTransactionUseCase } from './use-cases/create-income/create-income-transaction.use-case'

@Module({
  controllers: [TransactionsController],
  providers: [CreateIncomeTransactionUseCase],
})
export class TransactionsModule {}
