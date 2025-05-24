import { Provider } from '@nestjs/common'
import { transactionsProviders } from './repositories/transactions/transactions.providers'

export const repositoriesProviders: Array<Provider> = transactionsProviders
