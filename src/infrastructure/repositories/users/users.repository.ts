import { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { UserEntity } from 'src/entities/user.entity'
import { Users as UsersInAuthentication } from 'src/authentication/domains/users.domain'

@Injectable()
export class UsersRepository extends Repository<UserEntity> implements UsersInAuthentication {
  constructor(entityManager: EntityManager) {
    super(UserEntity, entityManager)
  }

  findById(id: string) {
    return this.findOne({ where: { id: String(id) } })
  }
}
