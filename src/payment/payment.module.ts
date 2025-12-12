import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { PaymentController } from './payment.controller';

@Module({
  providers: [PaymentService],
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [PaymentController],
})
export class PaymentModule {}
