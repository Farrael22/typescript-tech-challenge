import { UserEntity } from 'src/entities/user.entity'

export const Users = Symbol('Users')

export interface Users {
  findByIdOrFail(id: string): Promise<UserEntity>
  save(user: UserEntity): Promise<UserEntity>
}
