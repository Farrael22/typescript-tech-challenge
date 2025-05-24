import { Provider } from '@nestjs/common'

import { TransactionsRepository } from './transactions.repository'
import { Transactions } from 'src/transactions/domains/transactions.domain'

export const transactionsProviders: Array<Provider> = [
  { provide: Transactions, useClass: TransactionsRepository },
]
