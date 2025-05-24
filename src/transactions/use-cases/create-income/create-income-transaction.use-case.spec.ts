import { Mock } from 'src/test.utils'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { CreateIncomeTransactionUseCase } from './create-income-transaction.use-case'
import { UserEntity } from 'src/entities/user.entity'
import { CreateIncomeTransactionDto } from 'src/transactions/dtos/create-income-transaction.dto'

describe('CreateIncomeTransactionUseCase', () => {
  const transactions = Mock<Transactions>({
    save: jest.fn(),
  })

  describe('#execute', () => {
    const requester = Mock<UserEntity>({
      id: 'user-id',
    })
    const payload = Mock<CreateIncomeTransactionDto>({
      amount: 100,
      description: 'description',
    })

    beforeEach(async () => {
      const useCase = new CreateIncomeTransactionUseCase(transactions)
      await useCase.execute(payload, requester)
    })

    it('saves a transaction', () => {
      expect(transactions.save).toHaveBeenCalledWith({
        userId: 'user-id',
        magnifiedAmount: 1000000,
        description: 'description',
      })
    })
  })
})
