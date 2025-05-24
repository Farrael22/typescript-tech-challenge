import { Provider } from '@nestjs/common'

import { TransactionsRepository } from './transactions.repository'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { Transactions as TransactionsInUsers } from 'src/users/domains/transactions.domain'

export const transactionsProviders: Array<Provider> = [
  { provide: Transactions, useClass: TransactionsRepository },
  { provide: TransactionsInUsers, useExisting: Transactions },
]
