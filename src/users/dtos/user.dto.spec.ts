import { Mock } from 'src/test.utils'
import { UserResponse } from './user.dto'
import { UserEntity } from 'src/entities/user.entity'

describe('UserResponse', () => {
  describe('#toJSON', () => {
    it('returns the user data', () => {
      const user = Mock<UserEntity>({
        username: 'test',
        createdAt: new Date('2021-01-01'),
        magnifiedBalance: 1000000,
      })

      expect(new UserResponse(user).toJSON()).toEqual({
        username: 'test',
        createdAt: 'January 01, 2021',
        balance: 100,
      })
    })
  })
})
