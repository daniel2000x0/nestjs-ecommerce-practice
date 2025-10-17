import { Injectable } from '@nestjs/common';
import { UpdateOrdersDetailDto } from './dto/update-orders-detail.dto';
import { CreateOrdersDetailDto } from './dto/create-orders-detail.dto';

@Injectable()
export class OrdersDetailsService {
  constructor() {}
  create(createOrderDetailDto: CreateOrdersDetailDto) {
    return createOrderDetailDto;
  }
  findAll() {
    return '';
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrdersDetailDto) {
    return updateOrderDetailDto;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
