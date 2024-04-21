import 'dotenv/config';
import { Options, MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { paramCase } from 'change-case';
import { SeedManager } from '@mikro-orm/seeder';

const config: Options = {
    metadataProvider: TsMorphMetadataProvider,
    driver: MySqlDriver,
    host: process.env.DB_HOSTNAME,
    port: Number.parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    entities: [
        './**/*.model.js',
    ],
    entitiesTs: [
        './**/*.model.ts',
    ],
    extensions: [
        Migrator,
        SeedManager,
    ],
    migrations: {
        path: 'migrations',
        pathTs: 'src/migrations',
    },
    seeder: {
        path: './seeders',
        pathTs: './src/seeders',
        defaultSeeder: 'DatabaseSeeder',
        glob: '!(*.d).{js,ts}',
        emit: 'ts',
        fileName: (className: string) => paramCase(className),
    },
};

export default config;
