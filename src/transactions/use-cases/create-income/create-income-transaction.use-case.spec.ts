import { Mock } from 'src/test.utils'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { CreateIncomeTransactionUseCase } from './create-income-transaction.use-case'

describe('CreateIncomeTransactionUseCase', () => {
  const transactions = Mock<Transactions>({
    save: jest.fn(),
  })

  describe('#execute', () => {
    beforeEach(async () => {
      const useCase = new CreateIncomeTransactionUseCase(transactions)
      await useCase.execute({
        userId: 'user-id',
        amount: 100,
        description: 'description',
      })
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
