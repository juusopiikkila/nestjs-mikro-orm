import {
    BaseEntity,
    Entity,
    ManyToMany,
    PrimaryKey,
    Property,
    Collection as MikroCollection,
} from '@mikro-orm/mysql';
import { Collection } from './collection.model';

@Entity()
export class Product extends BaseEntity {
    @PrimaryKey()
    id!: number;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    name!: string;

    @Property()
    sku!: string;

    @ManyToMany(() => Collection, (collection) => collection.matchProducts)
    matchCollections = new MikroCollection<Collection>(this);

    @ManyToMany(() => Collection, (collection) => collection.fetchProducts)
    fetchCollections = new MikroCollection<Collection>(this);
}
