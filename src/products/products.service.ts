import { type EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CollectionState } from 'src/orm/enums/collection-state.enum';
import { Product } from 'src/orm/models/product.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly repository: EntityRepository<Product>,
    ) {}

    async findOne(id: number): Promise<Product> {
        const product = await this.repository.findOne(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }

    async getConnectionBuggy(
        product: Product,
    ): Promise<Product[]> {
        return this.repository.createQueryBuilder('product')
            .leftJoin('fetchCollections', 'collection')
            .where({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'collection.state': CollectionState.PUBLISHED,
            })
            .andWhere(
                `EXISTS (
                    SELECT 1
                    FROM collection_match_products
                    WHERE collection_id = collection.id
                    AND product_id = ?)
                `,
                [product.id],
            )
            .orderBy({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'collection.priority': 'DESC',
            })
            .limit(25)
            .getResultList();
    }

    async getConnectionBugless(
        product: Product,
    ): Promise<Product[]> {
        return this.repository.createQueryBuilder('product')
            .leftJoin('fetchCollections', 'collection')
            .where({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'collection.state': CollectionState.PUBLISHED,
            })
            .andWhere(
                `EXISTS (
                    SELECT 1
                    FROM collection_match_products
                    WHERE collection_id = collection.id
                    AND product_id = ?)
                `,
                [product.id],
            )
            .limit(25)
            .getResultList();
    }
}
