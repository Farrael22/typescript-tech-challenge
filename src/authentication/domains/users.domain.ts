import { UserEntity } from 'src/entities/user.entity'

export const Users = Symbol('Users')

export interface Users {
  findById(id: string): Promise<Nullable<UserEntity>>
}
