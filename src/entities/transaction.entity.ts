import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  Relation,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { TransactionType } from './enums/transaction-type.enum'
import { Money } from 'src/utils/money'

@Entity('transactions', { schema: 'financial' })
@Unique(['originalTransactionId'])
@Index(['type', 'createdAt'])
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'integer',
    comment: `Amount stored as integer (multiplied by ${Money.multiplier} for precision)`,
  })
  magnifiedAmount: number

  @Index()
  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.Income,
  })
  type: TransactionType

  @Column({ length: 255, default: '' })
  description: string

  @Index()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  userId: string

  @Column({ nullable: true })
  originalTransactionId: Nullable<string>

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: Relation<UserEntity>

  @OneToOne(() => TransactionEntity, (transaction) => transaction.refundTransaction, {
    nullable: true,
  })
  @JoinColumn({ name: 'originalTransactionId' })
  originalTransaction: Relation<Nullable<TransactionEntity>>

  @OneToOne(() => TransactionEntity, (transaction) => transaction.originalTransaction, {
    nullable: true,
  })
  refundTransaction: Relation<Nullable<TransactionEntity>>

  constructor(props: Partial<TransactionEntity> = {}) {
    Object.assign(this, props)
  }

  get hasRefund() {
    return Boolean(this.refundTransaction)
  }
}
