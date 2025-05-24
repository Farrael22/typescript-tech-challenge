import { Mock } from 'src/test.utils'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { CreateExpenseTransactionUseCase } from './create-expense-transaction.use-case'
import { UserEntity } from 'src/entities/user.entity'
import { CreateTransactionDto } from 'src/transactions/dtos/create-income-transaction.dto'
import { TransactionType } from 'src/entities/enums/transaction-type.enum'

describe('CreateIncomeTransactionUseCase', () => {
  const transactions = Mock<Transactions>({
    save: jest.fn(),
  })

  describe('#execute', () => {
    const requester = Mock<UserEntity>({
      id: 'user-id',
    })
    const payload = Mock<CreateTransactionDto>({
      amount: 100,
      description: 'description',
    })

    beforeEach(async () => {
      const useCase = new CreateExpenseTransactionUseCase(transactions)
      await useCase.execute(payload, requester)
    })

    it('saves a transaction', () => {
      expect(transactions.save).toHaveBeenCalledWith({
        userId: 'user-id',
        magnifiedAmount: 1000000,
        description: 'description',
        type: TransactionType.Expense,
      })
    })
  })
})
