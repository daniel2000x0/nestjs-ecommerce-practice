import { CreateOrderDto } from './create-order.dto';
import { OrdersDetailDto } from './ordenDetail.dto';

export class CreateOrderRequestDto {
  order: CreateOrderDto;
  orderDetails: OrdersDetailDto[];
}
