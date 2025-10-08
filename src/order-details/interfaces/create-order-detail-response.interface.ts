import { OrderDetail } from '../entities/order-detail.entity';

export interface CreateOrderDetailResponse {
  message: string;
  neworder: OrderDetail;
}
