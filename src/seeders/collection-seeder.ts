import { EntityManager } from '@mikro-orm/mysql';
import { Seeder, Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { Collection } from 'src/orm/models/collection.model';
import { CollectionState } from 'src/orm/enums/collection-state.enum';

export class CollectionFactory extends Factory<Collection> {
    model = Collection;

    definition(): Partial<Collection> {
        return {
            createdAt: faker.date.recent({ days: 100 }),
            name: faker.company.name(),
            state: sample(CollectionState),
            priority: faker.number.int({ min: 0, max: 100 }),
        };
    }
}

export class CollectionSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        new CollectionFactory(em).make(10);
    }
}
