import { Module } from '@nestjs/common'
import { TransactionsController } from './controllers/transactions.controller'
import { CreateIncomeTransactionUseCase } from './use-cases/create-income/create-income-transaction.use-case'
import { CreateRefundTransactionUseCase } from './use-cases/create-refund/create-refund-transaction.use-case'

@Module({
  controllers: [TransactionsController],
  providers: [CreateIncomeTransactionUseCase, CreateRefundTransactionUseCase],
})
export class TransactionsModule {}
