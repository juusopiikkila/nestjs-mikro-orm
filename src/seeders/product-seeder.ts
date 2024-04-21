import { EntityManager, wrap } from '@mikro-orm/mysql';
import { Seeder, Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { random, sampleSize } from 'lodash';
import { Product } from 'src/orm/models/product.model';
import { Collection } from 'src/orm/models/collection.model';

export class ProductFactory extends Factory<Product> {
    model = Product;

    definition(): Partial<Product> {
        return {
            createdAt: faker.date.recent({ days: 100 }),
            name: faker.commerce.productName(),
            sku: faker.commerce.isbn(),
        };
    }
}

export class ProductSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const collections = await em.getRepository(Collection).findAll();

        new ProductFactory(em).each((product) => {
            const matchCollections = sampleSize(collections, random(0, 5));

            const fetchCollections = sampleSize(collections, random(0, 5))
                .filter((collection) => !matchCollections.includes(collection));

            wrap(product).assign({
                matchCollections,
                fetchCollections,
            }, { em });
        }).make(100);
    }
}
