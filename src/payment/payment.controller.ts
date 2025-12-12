import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly payment: PaymentService) {}
  @Get('checkout')
  async redirectToCheckout(@Query('orderId') orderId: number, @Res() res: any) {
    const session = await this.payment.createChecout(orderId);

    return res.redirect(session.url); // ← redirección directa a Stripe
  }

  @Get('success')
  async create(@Query('orderId') orderId: number) {
    if (!orderId) {
      throw new BadRequestException('orderId es requerido');
    }
    await this.payment.markOrderAsPaid(orderId);

    return {
      message: 'Pago realizado correctamente',
      orderId,
      status: 'paid',
    };
  }

  @Get('cancel')
  handleCancel() {
    return { message: 'Pago cancelado' };
  }
}
