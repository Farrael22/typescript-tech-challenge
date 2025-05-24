import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator'

export class CreateIncomeTransactionDto {
  @IsUUID()
  userId: string

  @IsNumber()
  @Min(0.001, { message: 'Amount must be greater than 0.001' })
  amount: number

  @IsString()
  @IsOptional()
  description: Optional<string>
}
