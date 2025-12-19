import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
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
  // metodo de registro   de las  ordenes
  async regisorder(createDto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { orderDetails } = createDto;

      const total = orderDetails.reduce((sum, item) => {
        const itemTotal =
          item.quantity * item.unitprice * (1 - (item.discount ?? 0) / 100);
        return sum + itemTotal;
      }, 0);

      const order = this.repoorder.create({
        customerid: createDto.customerid,
        customername: createDto.customername,
        customercountry: createDto.customercountry,
        customercity: createDto.customercity,
        customerregion: createDto.customerregion,
        customerzip: createDto.customerzip,
        customeraddress: createDto.customeraddress,
        customerphone: createDto.customerphone,
        total_general: total,
      });
      const savedOrder = await queryRunner.manager.save(order);

      const details = orderDetails.map((d) => {
        const detail = new OrdersDetail();
        detail.orderid = order.orderid;
        detail.productid = d.productid;
        detail.quantity = d.quantity;
        detail.unitprice = d.unitprice;
        detail.discount = d.discount ?? 0;
        detail.total = d.quantity * d.unitprice * (1 - (d.discount ?? 0) / 100);
        return detail;
      });

      // 3. Guardar todos los detalles
      await queryRunner.manager.save(details);

      await queryRunner.commitTransaction();
      return savedOrder;

      /* const newOrder = this.repoorder.create({
        orderid: createDto.orderid,
        customerid: createDto.customerid,
        customername: createDto.customername,
        customercountry: createDto.customercountry,
        customercity: createDto.customercity,
        customerregion: createDto.customerregion,
        customerzip: createDto.customerzip,
        customeraddress: createDto.customeraddress,
        customerphone: createDto.customerphone,
        details: orderDetails.map((detailDto) => {
          const detail = new OrdersDetail();
          detail.orderid = newOrder.orderid;
          detail.productid = detailDto.productid;
          detail.quantity = detailDto.quantity;
          detail.unitprice = detailDto.unitprice;
          detail.discount = detailDto.discount ?? 0;
          detail.total =
            detailDto.quantity *
            detailDto.unitprice *
            (1 - (detailDto.discount ?? 0) / 100);

          return detail;
        }),
        total_general: total,
      });*/
      //    return this.repoorder.save(newOrder);
      /*   const savedOrder = await queryRunner.manager.save(newOrder);

      await queryRunner.commitTransaction();
      return savedOrder;*/
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('Error al  registrar la  order' + error.message);
    } finally {
      await queryRunner.release();
    }
  }

  // end  metodo
  async findAll() {
    const orders = await this.repoorder.find();
    return orders;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updateorder = await this.repoorder.findOne({
        where: { orderid: id },
        relations: ['oderDetails'],
      });
      if (!updateorder) {
        throw new NotFoundException(`order con id ${id} no encontrado`);
      }
      const { orderDetails: ordersDetails, ...orderData } = updateOrderDto;
      Object.assign(updateorder, orderData);

      if (ordersDetails && ordersDetails.length > 0) {
        await queryRunner.manager.delete(OrdersDetail, { orderid: id });
        const ordenDetails = ordersDetails.map((detailDto) => {
          const detail = new OrdersDetail();
          detail.orderid = updateorder.orderid;
          detail.productid = detailDto.productid;
          detail.quantity = detailDto.quantity;
          detail.unitprice = detailDto.unitprice;
          detail.discount = detailDto.discount ?? 0;
          detail.total =
            detailDto.quantity *
            detailDto.unitprice *
            (1 - (detailDto.discount ?? 0) / 100);
          return detail;
        });
        await queryRunner.manager.save(ordenDetails);
        updateorder.details = ordenDetails;
      }
      const newordersa = await this.repoorder.save(updateorder);
      await queryRunner.commitTransaction();
      return newordersa;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
