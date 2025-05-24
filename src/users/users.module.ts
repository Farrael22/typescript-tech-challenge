import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users.controllers'
import { ConsolidateBalanceUseCase } from './use-cases/consolidate-balance.use-case'
import { BalanceConsolidationsConsumer } from './consumers/balance-consolidations.consumer'
import { TransactionsListener } from './listeners/transactions.listener'

@Module({
  controllers: [UsersController],
  providers: [ConsolidateBalanceUseCase, BalanceConsolidationsConsumer, TransactionsListener],
})
export class UsersModule {}
