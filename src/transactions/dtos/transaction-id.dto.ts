import { IsUUID } from 'class-validator'

export class TransactionIdDto {
  @IsUUID()
  transactionId: string
}
