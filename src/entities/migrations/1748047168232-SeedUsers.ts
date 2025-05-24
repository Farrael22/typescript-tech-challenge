import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedUsers1748047168232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "users" ("id", "username", "createdAt") VALUES
      ('ff31bab9-25ed-4079-bc1c-b5ffd7ef4d6e', 'user_one', NOW()),
      ('345d6b03-0340-466c-9940-4fad6ab03b0f', 'user_two', NOW()),
      ('43892739-6358-4f1e-b408-ec1f2c46fac9', 'user_three', NOW()),
      ('876c98fb-bc23-4015-a344-c5c6b96a1d18', 'user_four', NOW()),
      ('af5450fd-f31a-418b-b7a8-fe605dc7cfd5', 'user_five', NOW());
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
