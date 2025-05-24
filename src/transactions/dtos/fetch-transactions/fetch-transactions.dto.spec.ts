import 'reflect-metadata'
import { Mock } from 'src/test.utils'
import { FetchTransactionsQuery, FetchTransactionsResponse } from './fetch-transactions.dto'
import { TransactionEntity } from 'src/entities/transaction.entity'
import { TransactionType } from 'src/entities/enums/transaction-type.enum'

describe('FetchTransactionsResponse', () => {
  describe('#toJSON', () => {
    const transactions = [
      Mock<TransactionEntity>({
        id: 'transaction-id',
        magnifiedAmount: 1000000,
        description: 'description',
        createdAt: new Date('2025-01-01'),
        type: TransactionType.Income,
      }),
      Mock<TransactionEntity>({
        id: 'transaction-id',
        magnifiedAmount: 200000,
        description: 'description',
        createdAt: new Date('2025-01-02'),
        type: TransactionType.Expense,
      }),
    ]
    const query = Mock<FetchTransactionsQuery>({
      take: 2,
      skip: 0,
    })

    it('returns the transactions and total', () => {
      const response = new FetchTransactionsResponse(transactions, 3, query)

      expect(response.toJSON()).toEqual({
        transactions: [
          {
            id: 'transaction-id',
            amount: 100,
            description: 'description',
            type: TransactionType.Income,
            createdAt: 'January 01, 2025',
          },
          {
            id: 'transaction-id',
            amount: 20,
            description: 'description',
            type: TransactionType.Expense,
            createdAt: 'January 02, 2025',
          },
        ],
        hasMore: true,
      })
    })
  })
})
