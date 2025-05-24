import { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { UserEntity } from 'src/entities/user.entity'
import { Users } from 'src/users/domains/users.domain'
import { Users as UsersInAuthentication } from 'src/authentication/domains/users.domain'

@Injectable()
export class UsersRepository
  extends Repository<UserEntity>
  implements Users, UsersInAuthentication
{
  constructor(entityManager: EntityManager) {
    super(UserEntity, entityManager)
  }

  findById(id: string) {
    return this.findOne({ where: { id: String(id) } })
  }

  findByIdOrFail(id: string) {
    return this.findOneOrFail({ where: { id: String(id) } })
  }
}
