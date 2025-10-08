import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { In, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const products = await this.productRepository.find({
      where: { productid: In(createOrderDetailDto.productid) },
    });

    if (products.length === 0) {
      throw new NotFoundException('Not products found');
    }
    const order = await this.orderRepository.findOne({
      where: { orderid: createOrderDetailDto.orderid },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const orderDetail = products.map((product) =>
      this.orderDetailsRepository.create({
        orderid: order,
        productid: product,
        price: createOrderDetailDto.price,
        quantity: createOrderDetailDto.quantity,
        discount: createOrderDetailDto.discount,
      }),
    );

    return this.orderDetailsRepository.save(orderDetail);
  }
  async findAll() {
    return await this.orderDetailsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDetail = await this.orderDetailsRepository.findOne({
      where: { serial: id },
      relations: ['orderid', 'productid'],
    });
    if (!orderDetail) {
      throw new NotFoundException(`OrderDetail #${id} not found`);
    }
    Object.assign(orderDetail, updateOrderDetailDto);
    await this.orderDetailsRepository.save(orderDetail);
    return orderDetail;
  }

  async remove(id: number) {
    const orderDetail = await this.orderDetailsRepository.findOne({
      where: { serial: id },
    });
    if (!orderDetail) {
      throw new NotFoundException(`OrderDetail #${id} not found`);
    }
    await this.orderDetailsRepository.remove(orderDetail);
    return `This action removes a #${id} orderDetail`;
  }
}
