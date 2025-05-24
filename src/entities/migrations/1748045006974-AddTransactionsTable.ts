import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTransactionsTable1748045006974 implements MigrationInterface {
  name = 'AddTransactionsTable1748045006974'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "financial"`)
    await queryRunner.query(
      `CREATE TYPE "financial"."transactions_type_enum" AS ENUM('income', 'refund', 'expense')`,
    )
    await queryRunner.query(
      `CREATE TABLE "financial"."transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "type" "financial"."transactions_type_enum" NOT NULL DEFAULT 'income', "description" character varying(255) NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")); COMMENT ON COLUMN "financial"."transactions"."amount" IS 'Amount stored as integer (multiplied by 1000 for precision)'`,
    )
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`,
    )
    await queryRunner.query(`DROP TABLE "financial"."transactions"`)
    await queryRunner.query(`DROP TYPE "financial"."transactions_type_enum"`)
  }
}
