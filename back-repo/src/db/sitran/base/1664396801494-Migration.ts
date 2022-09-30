import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1664396801494 implements MigrationInterface {
    name = 'Migration1664396801494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agregador" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "key" int NOT NULL, CONSTRAINT "PK_24296609d93b9c8b2125b826ec4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" int NOT NULL IDENTITY(1,1), "login" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, "id_type" nvarchar(255) NOT NULL, "ident" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "expireAt" datetime, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_6014db9f63d11c862acf8f6d72b" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_b548794ef91658a97cbb2a02b69" DEFAULT getdate(), "estatus" int NOT NULL, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios_agregadores_agregador" ("usuariosId" int NOT NULL, "agregadorId" int NOT NULL, CONSTRAINT "PK_35e402be576a7b6e575323b6229" PRIMARY KEY ("usuariosId", "agregadorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d261ebc1881facca3d3ceef7df" ON "usuarios_agregadores_agregador" ("usuariosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d0d31482af13191ccfb9a5d24b" ON "usuarios_agregadores_agregador" ("agregadorId") `);
        await queryRunner.query(`ALTER TABLE "usuarios_agregadores_agregador" ADD CONSTRAINT "FK_d261ebc1881facca3d3ceef7dff" FOREIGN KEY ("usuariosId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios_agregadores_agregador" ADD CONSTRAINT "FK_d0d31482af13191ccfb9a5d24bd" FOREIGN KEY ("agregadorId") REFERENCES "agregador"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios_agregadores_agregador" DROP CONSTRAINT "FK_d0d31482af13191ccfb9a5d24bd"`);
        await queryRunner.query(`ALTER TABLE "usuarios_agregadores_agregador" DROP CONSTRAINT "FK_d261ebc1881facca3d3ceef7dff"`);
        await queryRunner.query(`DROP INDEX "IDX_d0d31482af13191ccfb9a5d24b" ON "usuarios_agregadores_agregador"`);
        await queryRunner.query(`DROP INDEX "IDX_d261ebc1881facca3d3ceef7df" ON "usuarios_agregadores_agregador"`);
        await queryRunner.query(`DROP TABLE "usuarios_agregadores_agregador"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "agregador"`);
    }

}
