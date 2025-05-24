import { Mock } from 'src/test.utils'
import { ConsolidateBalanceUseCase } from './consolidate-balance.use-case'
import { Users } from '../domains/users.domain'
import { Transactions } from '../domains/transactions.domain'
import { TransactionEntity } from 'src/entities/transaction.entity'
import { UserEntity } from 'src/entities/user.entity'

describe('ConsolidateBalanceUseCase', () => {
  const transactions = Mock<Transactions>({
    findByIdOrFail: jest.fn(),
  })
  const users = Mock<Users>({
    findByIdOrFail: jest.fn(),
    save: jest.fn(),
  })

  describe('#execute', () => {
    const transaction = Mock<TransactionEntity>({
      id: 'transaction-id',
      magnifiedAmount: 1000000,
    })
    const user = Mock<UserEntity>({
      id: 'user-id',
      consolidateBalance: jest.fn(),
    })

    beforeAll(async () => {
      transactions.findByIdOrFail = jest.fn().mockResolvedValue(transaction)
      users.findByIdOrFail = jest.fn().mockResolvedValue(user)

      const useCase = new ConsolidateBalanceUseCase(transactions, users)
      await useCase.execute('transaction-id', 'user-id')
    })

    it('finds the transaction', () => {
      expect(transactions.findByIdOrFail).toHaveBeenCalledWith('transaction-id')
    })

    it('finds the user', () => {
      expect(users.findByIdOrFail).toHaveBeenCalledWith('user-id')
    })

    it('consolidates the balance', () => {
      expect(user.consolidateBalance).toHaveBeenCalledWith({
        id: 'transaction-id',
        magnifiedAmount: 1000000,
      })
    })

    it('saves the user', () => {
      expect(users.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'user-id',
        }),
      )
    })
  })
})
