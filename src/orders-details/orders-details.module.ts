import { forwardRef, Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { OrdersDetailsController } from './orders-details.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule), // 👈 CLAVE
  ],
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService],
})
export class OrdersDetailsModule {}
