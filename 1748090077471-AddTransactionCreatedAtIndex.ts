import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTransactionCreatedAtIndex1748090077471 implements MigrationInterface {
  name = 'AddTransactionCreatedAtIndex1748090077471'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_2d5fa024a84dceb158b2b95f34" ON "financial"."transactions" ("type") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_e744417ceb0b530285c08f3865" ON "financial"."transactions" ("createdAt") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f4bab09efce4a0e46784d0ccf4" ON "financial"."transactions" ("type", "createdAt") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "financial"."IDX_f4bab09efce4a0e46784d0ccf4"`)
    await queryRunner.query(`DROP INDEX "financial"."IDX_e744417ceb0b530285c08f3865"`)
    await queryRunner.query(`DROP INDEX "financial"."IDX_2d5fa024a84dceb158b2b95f34"`)
  }
}
