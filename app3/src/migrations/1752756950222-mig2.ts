import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig21752756950222 implements MigrationInterface {
    name = 'Mig21752756950222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`deleteAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`deleteAt\``);
    }

}
