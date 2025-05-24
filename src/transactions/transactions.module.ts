import { Module } from '@nestjs/common'
import { TransactionsController } from './controllers/transactions.controller'
import { CreateIncomeTransactionUseCase } from './use-cases/create-income/create-income-transaction.use-case'
import { CreateRefundTransactionUseCase } from './use-cases/create-refund/create-refund-transaction.use-case'
import { CreateExpenseTransactionUseCase } from './use-cases/create-expense/create-expense-transaction.use-case'
import { FetchTransactionsUseCase } from './use-cases/fetch-transactions/fetch-transactions.use-case'

@Module({
  controllers: [TransactionsController],
  providers: [
    CreateIncomeTransactionUseCase,
    CreateRefundTransactionUseCase,
    CreateExpenseTransactionUseCase,
    FetchTransactionsUseCase,
  ],
})
export class TransactionsModule {}
