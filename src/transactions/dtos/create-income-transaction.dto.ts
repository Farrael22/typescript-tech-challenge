import { IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class CreateTransactionDto {
  @IsNumber()
  @Min(0.001, { message: 'Amount must be greater than 0.001' })
  amount: number

  @IsString()
  @IsOptional()
  description: Optional<string>
}
