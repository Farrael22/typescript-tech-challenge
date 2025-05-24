import { Provider } from '@nestjs/common'

import { UsersRepository } from './users.repository'
import { Users } from 'src/authentication/domains/users.domain'

export const usersProviders: Array<Provider> = [{ provide: Users, useClass: UsersRepository }]
