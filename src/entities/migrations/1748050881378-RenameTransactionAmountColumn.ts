import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameTransactionAmountColumn1748050881378 implements MigrationInterface {
  name = 'RenameTransactionAmountColumn1748050881378'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" RENAME COLUMN "amount" TO "magnifiedAmount"`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "financial"."transactions"."magnifiedAmount" IS 'Amount stored as integer (multiplied by 10000 for precision)'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "financial"."transactions"."magnifiedAmount" IS 'Amount stored as integer (multiplied by 1000 for precision)'`,
    )
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" RENAME COLUMN "magnifiedAmount" TO "amount"`,
    )
  }
}
