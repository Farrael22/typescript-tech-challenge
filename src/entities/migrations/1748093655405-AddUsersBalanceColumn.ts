import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUsersBalanceColumn1748093655405 implements MigrationInterface {
  name = 'AddUsersBalanceColumn1748093655405'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "magnifiedBalance" integer NOT NULL DEFAULT '0'`,
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "users"."magnifiedBalance" IS 'Amount stored as integer (multiplied by 10000 for precision)'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "users"."magnifiedBalance" IS 'Amount stored as integer (multiplied by 10000 for precision)'`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "magnifiedBalance"`)
  }
}
