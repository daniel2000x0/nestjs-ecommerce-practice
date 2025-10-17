import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';

import { CreateOrderRequestDto } from './dto/createOrderRequest.dto.tsto';
import { OrdersDetail } from 'src/orders-details/entities/orders-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Order)
    private readonly repoorder: Repository<Order>,
    @InjectRepository(OrdersDetail)
    private readonly repoorderdetail: Repository<OrdersDetail>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const createdorder: Order = this.repoorder.create(createOrderDto);
    return await this.repoorder.save(createdorder);
  }

  async regisorder(createDto: CreateOrderRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { order, orderDetails } = createDto;

      // 👇 Mapeo explícito del DTO a la entidad Order
      const newOrder = this.repoorder.create({
        orderid: order.orderid,
        customerid: order.customerid,
        customerName: order.customerName,
        customercountry: order.customercountry,
        customercity: order.customercity,
        customerregion: order.customerregion,
        customerzip: order.customerzip,
        customeraddress: order.customeraddress,
        customerphone: order.customerphone,
      });

      const savedorder = await queryRunner.manager.save(Order, newOrder);

      const detailSave = orderDetails.map((detailDto) => {
        const detail = new OrdersDetail();
        detail.order = savedorder;
        detail.productid = detailDto.productid;
        detail.quantity = detailDto.quantity;
        detail.unitprice = detailDto.unitprice;
        detail.discount = detailDto.discount ?? 0;
        return detail;
      });
      const savedDetails = await queryRunner.manager.save(
        OrdersDetail,
        detailSave,
      );
      await queryRunner.commitTransaction();
      return {
        ...savedorder,
        details: savedDetails,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('Error al  registrar la  order' + error.message);
    } finally {
      await queryRunner.release();
    }
  }
  async findAll() {
    const orders = await this.repoorder.find();
    return orders;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updateorder = await this.repoorder.findOne({
      where: { orderid: id },
    });
    if (!updateorder) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    Object.assign(updateorder, updateOrderDto);
    return await this.repoorder.save(updateorder);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
