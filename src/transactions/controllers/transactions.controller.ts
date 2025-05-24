import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common'
import { CreateTransactionDto } from '../dtos/create-income-transaction.dto'
import { CreateIncomeTransactionUseCase } from '../use-cases/create-income/create-income-transaction.use-case'
import { UserEntity } from 'src/entities/user.entity'
import { LoggedUser } from 'src/authentication/decorators/logged-user.decorator'
import { TransactionIdDto } from '../dtos/transaction-id.dto'
import { CreateRefundTransactionUseCase } from '../use-cases/create-refund/create-refund-transaction.use-case'
import { CreateExpenseTransactionUseCase } from '../use-cases/create-expense/create-expense-transaction.use-case'
import {
  FetchTransactionsQuery,
  FetchTransactionsResponse,
} from '../dtos/fetch-transactions/fetch-transactions.dto'
import { FetchTransactionsUseCase } from '../use-cases/fetch-transactions/fetch-transactions.use-case'

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createIncomeTransactionUseCase: CreateIncomeTransactionUseCase,
    private readonly createRefundTransactionUseCase: CreateRefundTransactionUseCase,
    private readonly createExpenseTransactionUseCase: CreateExpenseTransactionUseCase,
    private readonly fetchTransactionsUseCase: FetchTransactionsUseCase,
  ) {}

  @Post('incomes')
  @HttpCode(201)
  createIncome(@Body() payload: CreateTransactionDto, @LoggedUser() requester: UserEntity) {
    return this.createIncomeTransactionUseCase.execute(payload, requester)
  }

  @Post(':transactionId/refunds')
  @HttpCode(201)
  createRefund(@Param() { transactionId }: TransactionIdDto, @LoggedUser() requester: UserEntity) {
    return this.createRefundTransactionUseCase.execute(transactionId, requester)
  }

  @Post('expenses')
  @HttpCode(201)
  createExpense(@Body() payload: CreateTransactionDto, @LoggedUser() requester: UserEntity) {
    return this.createExpenseTransactionUseCase.execute(payload, requester)
  }

  @Get()
  @HttpCode(200)
  async fetch(@LoggedUser() requester: UserEntity, @Query() query: FetchTransactionsQuery) {
    const { transactions, total } = await this.fetchTransactionsUseCase.execute(requester, query)
    return new FetchTransactionsResponse(transactions, total, query)
  }
}
