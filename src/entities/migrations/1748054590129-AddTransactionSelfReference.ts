import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTransactionSelfReference1748054590129 implements MigrationInterface {
  name = 'AddTransactionSelfReference1748054590129'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" ADD "originalTransactionId" uuid`,
    )
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" ADD CONSTRAINT "UQ_7cb20660f1fbb1ddb4358bedd8a" UNIQUE ("originalTransactionId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" ADD CONSTRAINT "FK_7cb20660f1fbb1ddb4358bedd8a" FOREIGN KEY ("originalTransactionId") REFERENCES "financial"."transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" DROP CONSTRAINT "FK_7cb20660f1fbb1ddb4358bedd8a"`,
    )
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" DROP CONSTRAINT "UQ_7cb20660f1fbb1ddb4358bedd8a"`,
    )
    await queryRunner.query(
      `ALTER TABLE "financial"."transactions" DROP COLUMN "originalTransactionId"`,
    )
  }
}
