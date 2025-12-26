import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Stripe } from 'stripe';
import { Repository } from 'typeorm';
@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Order)
    private readonly repoorden: Repository<Order>,
  ) {
    const secret = this.configService.get<string>('STRIPE_SECRET', '');
    this.stripe = new Stripe(secret, { apiVersion: '2025-11-17.clover' });
  }
  async createChecout(orderId: number): Promise<Stripe.Checkout.Session> {
    const order = await this.repoorden.findOne({ where: { orderid: orderId } });
    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Pago de orden #${order.orderid}` },
            unit_amount: Math.round(order.total_general * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: order.customer.email,
      success_url: `http://localhost:3000/pay/success?order=${order.orderid}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/pay/cancel?order=${order.orderid}`,
    });

    return session;
  }

  async markOrderAsPaid(orderId: number) {
    const order = await this.repoorden.findOne({
      where: { orderid: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    await this.repoorden.save(order);

    return order;
  }
}
