import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoppingCart } from './entities/shopping-cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, Customer, Product])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
