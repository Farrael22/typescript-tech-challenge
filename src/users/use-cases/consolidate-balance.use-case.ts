import { Inject, Injectable } from '@nestjs/common'
import { Transactions } from '../domains/transactions.domain'
import { Users } from '../domains/users.domain'

@Injectable()
export class ConsolidateBalanceUseCase {
  constructor(
    @Inject(Transactions) private readonly transactions: Transactions,
    @Inject(Users) private readonly users: Users,
  ) {}

  async execute(transactionId: string, requesterId: string) {
    const transaction = await this.transactions.findByIdOrFail(transactionId)
    const user = await this.users.findByIdOrFail(requesterId)

    user.consolidateBalance(transaction)

    await this.users.save(user)
  }
}
