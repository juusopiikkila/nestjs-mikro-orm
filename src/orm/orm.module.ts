import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { Product } from './models/product.model';
import { Collection } from './models/collection.model';

@Global()
@Module({
    imports: [
        MikroOrmModule.forFeature([
            Product,
            Collection,
        ]),
    ],
    exports: [
        MikroOrmModule,
    ],
})
export class OrmModule {}
