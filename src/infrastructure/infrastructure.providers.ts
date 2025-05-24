import { Provider } from '@nestjs/common'
import { transactionsProviders } from './repositories/transactions/transactions.providers'
import { usersProviders } from './repositories/users/users.providers'

export const repositoriesProviders: Array<Provider> = transactionsProviders.concat(usersProviders)
