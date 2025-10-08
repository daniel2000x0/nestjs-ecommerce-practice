import { Module } from '@nestjs/common';
import { ProductsSizesService } from './products-sizes.service';
import { ProductsSizesController } from './products-sizes.controller';

@Module({
  controllers: [ProductsSizesController],
  providers: [ProductsSizesService],
})
export class ProductsSizesModule {}
