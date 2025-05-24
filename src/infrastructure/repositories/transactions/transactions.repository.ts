import {
  EntityManager,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm'
import { TransactionEntity } from 'src/entities/transaction.entity'
import { Injectable } from '@nestjs/common'
import { endOfDay, startOfDay } from 'date-fns'
import {
  Transactions,
  TransactionsSearchParams,
} from 'src/transactions/domains/transactions.domain'
import { Transactions as TransactionsInUsers } from 'src/users/domains/transactions.domain'

@Injectable()
export class TransactionsRepository
  extends Repository<TransactionEntity>
  implements Transactions, TransactionsInUsers
{
  constructor(entityManager: EntityManager) {
    super(TransactionEntity, entityManager)
  }

  findByIdOrFail(id: string): Promise<TransactionEntity> {
    return this.findOneOrFail({ where: { id: String(id) }, relations: { refundTransaction: true } })
  }

  async search({ userId, take, skip, type, start, end }: TransactionsSearchParams) {
    const where: FindOptionsWhere<TransactionEntity> = { userId: String(userId), type }

    if (start) {
      where.createdAt = MoreThanOrEqual(startOfDay(start))
    }

    if (end) {
      where.createdAt = LessThanOrEqual(endOfDay(end))
    }

    const [transactions, total] = await this.findAndCount({
      where,
      skip,
      take,
      order: { createdAt: 'DESC' },
    })

    return {
      transactions,
      total,
    }
  }
}
