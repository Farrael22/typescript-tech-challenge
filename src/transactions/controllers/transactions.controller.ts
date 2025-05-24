import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateIncomeTransactionDto } from '../dtos/create-income-transaction.dto'
import { CreateIncomeTransactionUseCase } from '../use-cases/create-income/create-income-transaction.use-case'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly createIncomeTransactionUseCase: CreateIncomeTransactionUseCase) {}

  @Post('incomes')
  @HttpCode(201)
  createIncomeTransaction(@Body() createIncomeTransactionDto: CreateIncomeTransactionDto) {
    return this.createIncomeTransactionUseCase.execute(createIncomeTransactionDto)
  }
}
