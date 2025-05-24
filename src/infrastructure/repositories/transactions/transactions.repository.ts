import { EntityManager, Repository } from 'typeorm'
import { TransactionEntity } from 'src/entities/transaction.entity'
import { Transactions } from 'src/transactions/domains/transactions.domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TransactionsRepository extends Repository<TransactionEntity> implements Transactions {
  constructor(entityManager: EntityManager) {
    super(TransactionEntity, entityManager)
  }

  findByIdOrFail(id: string): Promise<TransactionEntity> {
    return this.findOneOrFail({ where: { id: String(id) }, relations: { refundTransaction: true } })
  }
}
