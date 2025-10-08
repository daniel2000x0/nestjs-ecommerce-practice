import { Module } from '@nestjs/common';
import { ProductsColorsService } from './products-colors.service';
import { ProductsColorsController } from './products-colors.controller';

@Module({
  controllers: [ProductsColorsController],
  providers: [ProductsColorsService],
})
export class ProductsColorsModule {}
