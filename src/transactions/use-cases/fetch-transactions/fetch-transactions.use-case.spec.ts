import { Mock } from 'src/test.utils'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { FetchTransactionsUseCase } from './fetch-transactions.use-case'
import { UserEntity } from 'src/entities/user.entity'
import { FetchTransactionsQuery } from 'src/transactions/dtos/fetch-transactions/fetch-transactions.dto'
import { TransactionEntity } from 'src/entities/transaction.entity'
import { TransactionType } from 'src/entities/enums/transaction-type.enum'

describe('CreateIncomeTransactionUseCase', () => {
  const transactions = Mock<Transactions>({
    search: jest.fn(),
  })

  describe('#execute', () => {
    const requester = Mock<UserEntity>({
      id: 'user-id',
    })
    const query = Mock<FetchTransactionsQuery>({
      take: 10,
      skip: 0,
      type: TransactionType.Income,
      start: new Date('2025-01-01'),
      end: new Date('2025-01-02'),
    })
    let actual: { transactions: Array<TransactionEntity>; total: number }

    const transactionsResult = Mock<{
      transactions: Array<TransactionEntity>
      total: number
    }>({
      transactions: [
        Mock<TransactionEntity>({
          id: 'transaction-id',
          magnifiedAmount: 1000000,
          description: 'description',
          createdAt: new Date('2025-01-01'),
          type: TransactionType.Income,
        }),
      ],
      total: 1,
    })

    beforeAll(async () => {
      transactions.search = jest.fn().mockResolvedValue(transactionsResult)

      const useCase = new FetchTransactionsUseCase(transactions)
      actual = await useCase.execute(requester, query)
    })

    it('searches for transactions', () => {
      expect(transactions.search).toHaveBeenCalledWith({
        userId: 'user-id',
        take: 10,
        skip: 0,
        type: TransactionType.Income,
        start: new Date('2025-01-01'),
        end: new Date('2025-01-02'),
      })
    })

    it('returns the transactions and total', () => {
      expect(actual).toEqual({
        transactions: [
          {
            id: 'transaction-id',
            magnifiedAmount: 1000000,
            description: 'description',
            createdAt: new Date('2025-01-01'),
            type: TransactionType.Income,
          },
        ],
        total: 1,
      })
    })
  })
})
