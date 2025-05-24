import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTransactionTypeIndex1748088992849 implements MigrationInterface {
  name = 'AddTransactionTypeIndex1748088992849'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_2d5fa024a84dceb158b2b95f34" ON "financial"."transactions" ("type") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "financial"."IDX_2d5fa024a84dceb158b2b95f34"`)
  }
}
