import { Controller, Get, Param } from '@nestjs/common';
import type { Product } from 'src/orm/models/product.model';
import { NotFoundError } from '@mikro-orm/core';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly service: ProductsService,
    ) {}

    @Get('bugless/:id')
    async findAllBugless(
        @Param('id') id: string,
    ): Promise<Product[]> {
        const product = await this.service.findOne(Number(id));

        if (!product) {
            throw new NotFoundError('Product not found');
        }

        return this.service.getConnectionBugless(product);
    }

    @Get('buggy/:id')
    async findAllBuggy(
        @Param('id') id: string,
    ): Promise<Product[]> {
        const product = await this.service.findOne(Number(id));

        if (!product) {
            throw new NotFoundError('Product not found');
        }

        return this.service.getConnectionBuggy(product);
    }
}
