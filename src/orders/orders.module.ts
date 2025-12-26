import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/countries/entities/country.entity';
import { Customer } from 'src/customers/entities/customer.entity';

import { Order } from './entities/order.entity';
import { OrdersDetail } from 'src/orders-details/entities/orders-detail.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Customer, Country, OrdersDetail, Order]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, JwtStrategy],
})
export class OrdersModule {}
