import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsImage } from 'src/products-images/entities/products-image.entity';
import { ProductsSize } from 'src/products-sizes/entities/products-size.entity';
import { Manufacture } from 'src/manufactures/entities/manufacture.entity';
import { ProductsColor } from 'src/products-colors/entities/products-color.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from './entities/product.entity';
import { OrdersDetail } from 'src/orders-details/entities/orders-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Manufacture,
      ProductsImage,
      ProductsColor,
      ProductsSize,
      User,
      OrdersDetail,
      Product,
      Category,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
