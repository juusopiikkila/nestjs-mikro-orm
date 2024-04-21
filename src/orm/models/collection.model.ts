import {
    BaseEntity,
    Entity,
    ManyToMany,
    PrimaryKey,
    Property,
    Collection as MikroCollection,
    Enum,
} from '@mikro-orm/mysql';
import { Product } from './product.model';
import { CollectionState } from '../enums/collection-state.enum';

@Entity()
export class Collection extends BaseEntity {
    @PrimaryKey()
    id!: number;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    name!: string;

    @Enum({ items: () => CollectionState })
    state: CollectionState = CollectionState.HIDDEN;

    @Property()
    priority = 0;

    @ManyToMany(() => Product)
    matchProducts = new MikroCollection<Product>(this);

    @ManyToMany(() => Product)
    fetchProducts = new MikroCollection<Product>(this);
}
