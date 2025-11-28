import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1764181697262 implements MigrationInterface {
    name = 'entities1764181697262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Відомості про торгівлю тваринами" (
                "Номер транзакції" SERIAL NOT NULL,
                "Тип транзакції" character varying(7) NOT NULL,
                "Ціна" integer NOT NULL,
                "Ім'я клієнта" character varying(50) NOT NULL,
                "Прізвище клієнта" character varying(50) NOT NULL,
                "Id_Коня" integer NOT NULL,
                CONSTRAINT "PK_7f85d98402d78dbba5b171277b2" PRIMARY KEY ("Номер транзакції")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Аккаунт користувача" (
                "Id" SERIAL NOT NULL,
                "Логін" integer NOT NULL,
                "Вага користувача" integer NOT NULL,
                "Прізвище" character varying(50) NOT NULL,
                "Ім'я" character varying(50) NOT NULL,
                CONSTRAINT "UQ_68286159545bb4877191d1e3099" UNIQUE ("Логін"),
                CONSTRAINT "PK_20834fe3268c6da8607652938df" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Конюхи" (
                "Id" integer NOT NULL,
                "Номер стійла" smallint NOT NULL,
                CONSTRAINT "REL_09f0eddd5dda2aa5072b237ddd" UNIQUE ("Id"),
                CONSTRAINT "PK_09f0eddd5dda2aa5072b237ddd6" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Посади" (
                "Id" SERIAL NOT NULL,
                "Номер паспорту" character varying NOT NULL,
                "Ім'я" character varying(50) NOT NULL,
                "Прізвище" character varying(50) NOT NULL,
                "Посада" character varying(50) NOT NULL,
                CONSTRAINT "UQ_21110fabe082f4fabdf591dcf33" UNIQUE ("Номер паспорту"),
                CONSTRAINT "PK_9be338481257d24f35b9a25cc56" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Тренери" (
                "Id" integer NOT NULL,
                "Стаж" smallint NOT NULL,
                CONSTRAINT "REL_aadade738db01a9a4fd2b4f69c" UNIQUE ("Id"),
                CONSTRAINT "PK_aadade738db01a9a4fd2b4f69c8" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Заявки на тренування" (
                "Номер заявки" SERIAL NOT NULL,
                "Бажаний час" character varying(100) NOT NULL,
                "Вид тренувань" character varying(100) NOT NULL,
                "Кінь" integer NOT NULL,
                "Id_Клієнта" integer NOT NULL,
                "Статус" character varying NOT NULL,
                "Точний час тренування" character varying NOT NULL,
                "Тренер" integer NOT NULL,
                "Логін кліента" integer,
                CONSTRAINT "PK_a7c4fa94a5d3697ff44c5e844c4" PRIMARY KEY ("Номер заявки")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Коні" (
                "Id" SERIAL NOT NULL,
                "Вага" integer NOT NULL,
                "Номер стійла" smallint NOT NULL,
                "Використання" character varying NOT NULL,
                "Власник" character varying(100) NOT NULL,
                "Вік" smallint NOT NULL,
                "Зріст" integer NOT NULL,
                "Порода" character varying(50) NOT NULL,
                "Ім'я" character varying(50) NOT NULL,
                "Стать" character varying(1) NOT NULL,
                "Стан здоров'я" character varying(1000),
                CONSTRAINT "PK_b627abf010bfa735bdac8137228" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Стійло" (
                "Номер стійла" SMALLSERIAL NOT NULL,
                "Кількість місць" smallint NOT NULL,
                "Примітка" character varying(250) NOT NULL,
                CONSTRAINT "PK_ed437ead3fc900aa8e375296828" PRIMARY KEY ("Номер стійла")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Збруя" (
                "ID_Збруї" SERIAL NOT NULL,
                "Тип" character varying(20) NOT NULL,
                "Номер стійла" smallint NOT NULL,
                "Назва" character varying(50) NOT NULL,
                "Примітка" character varying(250) NOT NULL,
                CONSTRAINT "PK_0873489cbbcb7e8c485185e89e8" PRIMARY KEY ("ID_Збруї")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "Відомості про торгівлю тваринами"
            ADD CONSTRAINT "FK_1a6c8f9506372111799071a8e95" FOREIGN KEY ("Id_Коня") REFERENCES "Коні"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Конюхи"
            ADD CONSTRAINT "FK_09f0eddd5dda2aa5072b237ddd6" FOREIGN KEY ("Id") REFERENCES "Посади"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Конюхи"
            ADD CONSTRAINT "FK_1e3122a3de1b04293105629990a" FOREIGN KEY ("Номер стійла") REFERENCES "Стійло"("Номер стійла") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Тренери"
            ADD CONSTRAINT "FK_aadade738db01a9a4fd2b4f69c8" FOREIGN KEY ("Id") REFERENCES "Посади"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Заявки на тренування"
            ADD CONSTRAINT "FK_1a72b9d4f1b7b762ec8d8b5f71b" FOREIGN KEY ("Кінь") REFERENCES "Коні"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Заявки на тренування"
            ADD CONSTRAINT "FK_dad6cbc90cee344bc9e85cdefd9" FOREIGN KEY ("Логін кліента") REFERENCES "Аккаунт користувача"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Заявки на тренування"
            ADD CONSTRAINT "FK_4428aa217bf641990fbda3098ef" FOREIGN KEY ("Тренер") REFERENCES "Тренери"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Коні"
            ADD CONSTRAINT "FK_d10443ffdf86bf95298648cbc2f" FOREIGN KEY ("Номер стійла") REFERENCES "Стійло"("Номер стійла") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Збруя"
            ADD CONSTRAINT "FK_be259c2021dc2f7d9d52b2df0c7" FOREIGN KEY ("Номер стійла") REFERENCES "Стійло"("Номер стійла") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Збруя" DROP CONSTRAINT "FK_be259c2021dc2f7d9d52b2df0c7"
        `);
        await queryRunner.query(`
            ALTER TABLE "Коні" DROP CONSTRAINT "FK_d10443ffdf86bf95298648cbc2f"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заявки на тренування" DROP CONSTRAINT "FK_4428aa217bf641990fbda3098ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заявки на тренування" DROP CONSTRAINT "FK_dad6cbc90cee344bc9e85cdefd9"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заявки на тренування" DROP CONSTRAINT "FK_1a72b9d4f1b7b762ec8d8b5f71b"
        `);
        await queryRunner.query(`
            ALTER TABLE "Тренери" DROP CONSTRAINT "FK_aadade738db01a9a4fd2b4f69c8"
        `);
        await queryRunner.query(`
            ALTER TABLE "Конюхи" DROP CONSTRAINT "FK_1e3122a3de1b04293105629990a"
        `);
        await queryRunner.query(`
            ALTER TABLE "Конюхи" DROP CONSTRAINT "FK_09f0eddd5dda2aa5072b237ddd6"
        `);
        await queryRunner.query(`
            ALTER TABLE "Відомості про торгівлю тваринами" DROP CONSTRAINT "FK_1a6c8f9506372111799071a8e95"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            DROP TABLE "Збруя"
        `);
        await queryRunner.query(`
            DROP TABLE "Стійло"
        `);
        await queryRunner.query(`
            DROP TABLE "Коні"
        `);
        await queryRunner.query(`
            DROP TABLE "Заявки на тренування"
        `);
        await queryRunner.query(`
            DROP TABLE "Тренери"
        `);
        await queryRunner.query(`
            DROP TABLE "Посади"
        `);
        await queryRunner.query(`
            DROP TABLE "Конюхи"
        `);
        await queryRunner.query(`
            DROP TABLE "Аккаунт користувача"
        `);
        await queryRunner.query(`
            DROP TABLE "Відомості про торгівлю тваринами"
        `);
    }

}
