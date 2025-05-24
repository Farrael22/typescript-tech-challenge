import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Relation,
} from 'typeorm'
import { TransactionEntity as TransactionEntity } from './transaction.entity'
import { Money } from 'src/utils/money'
import { TransactionType } from './enums/transaction-type.enum'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 20 })
  username: string

  @Column({
    type: 'integer',
    comment: `Amount stored as integer (multiplied by ${Money.multiplier} for precision)`,
    default: 0,
  })
  magnifiedBalance: number

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user, {
    cascade: false,
    persistence: false,
  })
  transactions: Relation<Array<TransactionEntity>>

  constructor(props: Partial<UserEntity> = {}) {
    Object.assign(this, props)
  }

  consolidateBalance(transaction: TransactionEntity) {
    const operations: Record<TransactionType, (transaction: TransactionEntity) => void> = {
      [TransactionType.Income]: (transaction: TransactionEntity) => {
        this.magnifiedBalance += transaction.magnifiedAmount
      },
      [TransactionType.Refund]: (transaction: TransactionEntity) => {
        this.magnifiedBalance += transaction.magnifiedAmount
      },
      [TransactionType.Expense]: (transaction: TransactionEntity) => {
        this.magnifiedBalance -= transaction.magnifiedAmount
      },
    }

    operations[transaction.type](transaction)
  }
}
