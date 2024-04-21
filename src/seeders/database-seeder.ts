import type { EntityManager } from '@mikro-orm/mysql';
import { Seeder } from '@mikro-orm/seeder';
import { ProductSeeder } from './product-seeder';
import { CollectionSeeder } from './collection-seeder';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        await this.call(em, [
            CollectionSeeder,
        ]);

        await this.call(em, [
            ProductSeeder,
        ]);
    }
}
