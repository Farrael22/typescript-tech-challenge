import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Relation,
} from 'typeorm'
import { TransactionEntity as TransactionEntity } from './transaction.entity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 20 })
  username: string

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: Relation<Array<TransactionEntity>>
}
