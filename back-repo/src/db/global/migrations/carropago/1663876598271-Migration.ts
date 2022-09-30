import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1663876598271 implements MigrationInterface {
    name = 'Migration1663876598271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contra_cargo" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_c9593a5ce0226d6ae095de62021" DEFAULT 1, "createdAt" date NOT NULL CONSTRAINT "DF_9e5032bf32cb0b2e73c27e3bd58" DEFAULT getdate(), "updatedAt" date NOT NULL CONSTRAINT "DF_45a16a0539fe7b36e7aed825d12" DEFAULT getdate(), CONSTRAINT "PK_e150b9292a14450285f43f60679" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_65cada11aceb02caf4726b7b5a" ON "contra_cargo" ("name") `);
        await queryRunner.query(`CREATE TABLE "views" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "root" nvarchar(255), "key" int NOT NULL, "active" int NOT NULL CONSTRAINT "DF_a5d821bd12a20c9e7bcd8fe5678" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_a8b7f725007cb9ddd8098a71813" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_04f7f71efc2398d52010a4ab30e" DEFAULT getdate(), CONSTRAINT "PK_ae7537f375649a618fff0fb2cb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9e52a42b3331504c1c448f4aa7" ON "views" ("name", "root", "key") `);
        await queryRunner.query(`CREATE TABLE "ViewsXDep" ("id" int NOT NULL IDENTITY(1,1), "active" int NOT NULL CONSTRAINT "DF_0df76adc4006c51e40d07168cea" DEFAULT 1, "id_department" int, "id_views" int, CONSTRAINT "PK_76e155cd590abb7070ea412738d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a0929194d1202545bd360e34fb" ON "ViewsXDep" ("id_department", "id_views") `);
        await queryRunner.query(`CREATE TABLE "department" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_a0a617cd021b1c9e608ca43c745" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_7fab33683a2bfb9bcfa001aa995" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_633cc6089e6ceb143dfd64a0ca0" DEFAULT getdate(), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_471da4b90e96c1ebe0af221e07" ON "department" ("name") `);
        await queryRunner.query(`CREATE TABLE "roles" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_8879c4534a254c4b0871adc75ba" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_4d018866397b1e7e78d03b45662" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_c13070745ded32a88c920015f7e" DEFAULT getdate(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" int NOT NULL IDENTITY(1,1), "active" int NOT NULL CONSTRAINT "DF_6c05a77b08a9c4631ec33871490" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_da04f89054f39981438894dfe30" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_14936cb23d7de4c7b31b5cef053" DEFAULT getdate(), "id_department" int, "id_rol" int, "id_action" int, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actions" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "description" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_518723f5b5d234707f8ec0e4569" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_772bb765d8b7f552174e815c67c" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_405998cf04de4518f9f0f3a6365" DEFAULT getdate(), "id_views" int, CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contracargo_ejecutado" ("id" int NOT NULL IDENTITY(1,1), "active" int NOT NULL CONSTRAINT "DF_f0bde32fdb01128a9504ba48fd2" DEFAULT 1, "createdAt" date NOT NULL CONSTRAINT "DF_55b1052e097f6721142047ee2a9" DEFAULT getdate(), "createdAtFull" datetime NOT NULL CONSTRAINT "DF_e2c4952b27ce54134e233a8e798" DEFAULT getdate(), "updatedAt" date NOT NULL CONSTRAINT "DF_03d08177211318fd024dc76cd27" DEFAULT getdate(), "id_usuario" int, CONSTRAINT "PK_b7221449b30adb4614a99e90e3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_c22b821c8d0fdf2f00c1938997" ON "contracargo_ejecutado" ("id_usuario") WHERE "id_usuario" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "Usuario_Work" ("id" int NOT NULL IDENTITY(1,1), "id_rol" int NOT NULL CONSTRAINT "DF_77fadfb068301c4b22f4a717f78" DEFAULT 1, "id_department" int NOT NULL CONSTRAINT "DF_8ef0ac2857b72c9009cc4f9d15b" DEFAULT 1, "active" int NOT NULL CONSTRAINT "DF_85e1c52593395bb9306eb22fcc3" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_35de4ca069bb5fb3a0b405c9294" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_86aaf9a29ce372a6cf7e973d512" DEFAULT getdate(), "id_usuario" int, CONSTRAINT "PK_e722302ed16fc3721466debef53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_e645dc23f907f0385201325f78" ON "Usuario_Work" ("id_usuario") WHERE "id_usuario" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "abono_cliente_rechazado" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_57ec4fddc539821c74f25847b7a" DEFAULT 1, "createdAt" date NOT NULL CONSTRAINT "DF_01543789bd8aef6b7389ee43ec1" DEFAULT getdate(), "updatedAt" date NOT NULL CONSTRAINT "DF_7342fe17efdb1042fda8278b9d6" DEFAULT getdate(), CONSTRAINT "PK_b66f33979adbd217f5a552efa30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b16b05a9eca05d915efd03fa5a" ON "abono_cliente_rechazado" ("name") `);
        await queryRunner.query(`ALTER TABLE "ViewsXDep" ADD CONSTRAINT "FK_30a19887dcd8877d2e28f4c195a" FOREIGN KEY ("id_department") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ViewsXDep" ADD CONSTRAINT "FK_f744ae54b4f4832dc8df7053a89" FOREIGN KEY ("id_views") REFERENCES "views"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_e01dd64da531ed8c8a5abab9590" FOREIGN KEY ("id_department") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_10fe7ab9f2fd376f701718dc047" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_4ff7f0e8e6ea828332a38c5f8c7" FOREIGN KEY ("id_action") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "actions" ADD CONSTRAINT "FK_dd8cca9369ae4fee07d2a26c22c" FOREIGN KEY ("id_views") REFERENCES "views"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracargo_ejecutado" ADD CONSTRAINT "FK_c22b821c8d0fdf2f00c19389978" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Usuario_Work" ADD CONSTRAINT "FK_e645dc23f907f0385201325f786" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Usuario_Work" ADD CONSTRAINT "FK_77fadfb068301c4b22f4a717f78" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Usuario_Work" ADD CONSTRAINT "FK_8ef0ac2857b72c9009cc4f9d15b" FOREIGN KEY ("id_department") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuario_Work" DROP CONSTRAINT "FK_8ef0ac2857b72c9009cc4f9d15b"`);
        await queryRunner.query(`ALTER TABLE "Usuario_Work" DROP CONSTRAINT "FK_77fadfb068301c4b22f4a717f78"`);
        await queryRunner.query(`ALTER TABLE "Usuario_Work" DROP CONSTRAINT "FK_e645dc23f907f0385201325f786"`);
        await queryRunner.query(`ALTER TABLE "contracargo_ejecutado" DROP CONSTRAINT "FK_c22b821c8d0fdf2f00c19389978"`);
        await queryRunner.query(`ALTER TABLE "actions" DROP CONSTRAINT "FK_dd8cca9369ae4fee07d2a26c22c"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_4ff7f0e8e6ea828332a38c5f8c7"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_10fe7ab9f2fd376f701718dc047"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_e01dd64da531ed8c8a5abab9590"`);
        await queryRunner.query(`ALTER TABLE "ViewsXDep" DROP CONSTRAINT "FK_f744ae54b4f4832dc8df7053a89"`);
        await queryRunner.query(`ALTER TABLE "ViewsXDep" DROP CONSTRAINT "FK_30a19887dcd8877d2e28f4c195a"`);
        await queryRunner.query(`DROP INDEX "IDX_b16b05a9eca05d915efd03fa5a" ON "abono_cliente_rechazado"`);
        await queryRunner.query(`DROP TABLE "abono_cliente_rechazado"`);
        await queryRunner.query(`DROP INDEX "REL_e645dc23f907f0385201325f78" ON "Usuario_Work"`);
        await queryRunner.query(`DROP TABLE "Usuario_Work"`);
        await queryRunner.query(`DROP INDEX "REL_c22b821c8d0fdf2f00c1938997" ON "contracargo_ejecutado"`);
        await queryRunner.query(`DROP TABLE "contracargo_ejecutado"`);
        await queryRunner.query(`DROP TABLE "actions"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP INDEX "IDX_471da4b90e96c1ebe0af221e07" ON "department"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP INDEX "IDX_a0929194d1202545bd360e34fb" ON "ViewsXDep"`);
        await queryRunner.query(`DROP TABLE "ViewsXDep"`);
        await queryRunner.query(`DROP INDEX "IDX_9e52a42b3331504c1c448f4aa7" ON "views"`);
        await queryRunner.query(`DROP TABLE "views"`);
        await queryRunner.query(`DROP INDEX "IDX_65cada11aceb02caf4726b7b5a" ON "contra_cargo"`);
        await queryRunner.query(`DROP TABLE "contra_cargo"`);
    }

}
