import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { ShoppingCart } from 'src/shopping-cart/entities/shopping-cart.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, Order, Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
