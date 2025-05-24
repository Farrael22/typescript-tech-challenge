import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedUsers1748047168232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "users" ("username", "createdAt") VALUES
      ('user_one', NOW()),
      ('user_two', NOW()),
      ('user_three', NOW()),
      ('user_four', NOW()),
      ('user_five', NOW());
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "users" WHERE "username" IN (
        'user_one',
        'user_two', 
        'user_three',
        'user_four',
        'user_five'
      );
    `)
  }
}
