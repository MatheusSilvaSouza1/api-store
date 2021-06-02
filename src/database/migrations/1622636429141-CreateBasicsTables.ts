import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBasicsTables1622636429141 implements MigrationInterface {
    name = 'CreateBasicsTables1622636429141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "order_sales" ("id" varchar PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "price" integer NOT NULL, "clientId" varchar)`);
        await queryRunner.query(`CREATE TABLE "client" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cpf" varchar NOT NULL, "birthDate" datetime NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "order_sales_products_product" ("orderSalesId" varchar NOT NULL, "productId" varchar NOT NULL, PRIMARY KEY ("orderSalesId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_25914e6931626edd0939231e68" ON "order_sales_products_product" ("orderSalesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_847127b10f8a1e31cc5e279551" ON "order_sales_products_product" ("productId") `);
        await queryRunner.query(`CREATE TABLE "temporary_order_sales" ("id" varchar PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "price" integer NOT NULL, "clientId" varchar, CONSTRAINT "FK_5b1c5a6045f49b5317b9fbfb793" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order_sales"("id", "date", "price", "clientId") SELECT "id", "date", "price", "clientId" FROM "order_sales"`);
        await queryRunner.query(`DROP TABLE "order_sales"`);
        await queryRunner.query(`ALTER TABLE "temporary_order_sales" RENAME TO "order_sales"`);
        await queryRunner.query(`DROP INDEX "IDX_25914e6931626edd0939231e68"`);
        await queryRunner.query(`DROP INDEX "IDX_847127b10f8a1e31cc5e279551"`);
        await queryRunner.query(`CREATE TABLE "temporary_order_sales_products_product" ("orderSalesId" varchar NOT NULL, "productId" varchar NOT NULL, CONSTRAINT "FK_25914e6931626edd0939231e68b" FOREIGN KEY ("orderSalesId") REFERENCES "order_sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_847127b10f8a1e31cc5e279551d" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("orderSalesId", "productId"))`);
        await queryRunner.query(`INSERT INTO "temporary_order_sales_products_product"("orderSalesId", "productId") SELECT "orderSalesId", "productId" FROM "order_sales_products_product"`);
        await queryRunner.query(`DROP TABLE "order_sales_products_product"`);
        await queryRunner.query(`ALTER TABLE "temporary_order_sales_products_product" RENAME TO "order_sales_products_product"`);
        await queryRunner.query(`CREATE INDEX "IDX_25914e6931626edd0939231e68" ON "order_sales_products_product" ("orderSalesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_847127b10f8a1e31cc5e279551" ON "order_sales_products_product" ("productId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_847127b10f8a1e31cc5e279551"`);
        await queryRunner.query(`DROP INDEX "IDX_25914e6931626edd0939231e68"`);
        await queryRunner.query(`ALTER TABLE "order_sales_products_product" RENAME TO "temporary_order_sales_products_product"`);
        await queryRunner.query(`CREATE TABLE "order_sales_products_product" ("orderSalesId" varchar NOT NULL, "productId" varchar NOT NULL, PRIMARY KEY ("orderSalesId", "productId"))`);
        await queryRunner.query(`INSERT INTO "order_sales_products_product"("orderSalesId", "productId") SELECT "orderSalesId", "productId" FROM "temporary_order_sales_products_product"`);
        await queryRunner.query(`DROP TABLE "temporary_order_sales_products_product"`);
        await queryRunner.query(`CREATE INDEX "IDX_847127b10f8a1e31cc5e279551" ON "order_sales_products_product" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_25914e6931626edd0939231e68" ON "order_sales_products_product" ("orderSalesId") `);
        await queryRunner.query(`ALTER TABLE "order_sales" RENAME TO "temporary_order_sales"`);
        await queryRunner.query(`CREATE TABLE "order_sales" ("id" varchar PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "price" integer NOT NULL, "clientId" varchar)`);
        await queryRunner.query(`INSERT INTO "order_sales"("id", "date", "price", "clientId") SELECT "id", "date", "price", "clientId" FROM "temporary_order_sales"`);
        await queryRunner.query(`DROP TABLE "temporary_order_sales"`);
        await queryRunner.query(`DROP INDEX "IDX_847127b10f8a1e31cc5e279551"`);
        await queryRunner.query(`DROP INDEX "IDX_25914e6931626edd0939231e68"`);
        await queryRunner.query(`DROP TABLE "order_sales_products_product"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "order_sales"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
