import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Relation,
  JoinColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { TransactionType } from './enums/transaction-type.enum'
import { Money } from 'src/utils/money'

@Entity('transactions', { schema: 'financial' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'integer',
    comment: `Amount stored as integer (multiplied by ${Money.multiplier} for precision)`,
  })
  amount: number

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.Income,
  })
  type: TransactionType

  @Column({ length: 255, default: '' })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @Column()
  userId: string

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: Relation<UserEntity>
}
