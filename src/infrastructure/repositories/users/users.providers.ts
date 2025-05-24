import { Provider } from '@nestjs/common'

import { UsersRepository } from './users.repository'
import { Users } from 'src/users/domains/users.domain'
import { Users as UsersInAuthentication } from 'src/authentication/domains/users.domain'

export const usersProviders: Array<Provider> = [
  { provide: Users, useClass: UsersRepository },
  { provide: UsersInAuthentication, useExisting: Users },
]
