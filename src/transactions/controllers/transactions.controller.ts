import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateIncomeTransactionDto } from '../dtos/create-income-transaction.dto'
import { CreateIncomeTransactionUseCase } from '../use-cases/create-income/create-income-transaction.use-case'
import { UserEntity } from 'src/entities/user.entity'
import { LoggedUser } from 'src/authentication/decorators/logged-user.decorator'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly createIncomeTransactionUseCase: CreateIncomeTransactionUseCase) {}

  @Post('incomes')
  @HttpCode(201)
  createIncomeTransaction(
    @Body() payload: CreateIncomeTransactionDto,
    @LoggedUser() requester: UserEntity,
  ) {
    return this.createIncomeTransactionUseCase.execute(payload, requester)
  }
}
