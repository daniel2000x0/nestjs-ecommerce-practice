import { IsEnum, IsNotEmpty } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentStatus } from '../enums/paymentStatus';
import { PaymentMethod } from '../enums/paymentMethod';
import { PaymentProvider } from '../enums/paymentProvider';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;
  @ManyToOne(() => Order, (order) => order.orderid)
  @JoinColumn({ name: 'ordeid' })
  order: Order;
  @IsNotEmpty()
  @Column('decimal')
  amount: number;

  @Column({ default: 'usd' })
  Currency: string;
  @Column()
  provider: PaymentProvider;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;
  @Column()
  transaction_id: string;
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;
}
