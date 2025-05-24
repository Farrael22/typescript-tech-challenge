import { format } from 'date-fns'
import { UserEntity } from 'src/entities/user.entity'

export class UserResponse {
  constructor(private readonly user: UserEntity) {}

  toJSON() {
    return {
      username: this.user.username,
      createdAt: format(this.user.createdAt, 'MMMM dd, yyyy'),
    }
  }
}
