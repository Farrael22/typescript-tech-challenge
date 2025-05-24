import { format } from 'date-fns'
import { UserEntity } from 'src/entities/user.entity'
import { Money } from 'src/utils/money'

export class UserResponse {
  constructor(private readonly user: UserEntity) {}

  toJSON() {
    return {
      username: this.user.username,
      createdAt: format(this.user.createdAt, 'MMMM dd, yyyy'),
      balance: Money.fromMagnified(this.user.magnifiedBalance),
    }
  }
}
