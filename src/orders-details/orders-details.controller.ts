import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { CreateOrdersDetailDto } from './dto/create-orders-detail.dto';
import { UpdateOrdersDetailDto } from './dto/update-orders-detail.dto';

@Controller('orders-details')
export class OrdersDetailsController {
  constructor(private readonly orderDetailsService: OrdersDetailsService) {}

  @Post('orderDetail')
  create(@Body() createOrderDetailDto: CreateOrdersDetailDto) {
    try {
      return this.orderDetailsService.create(createOrderDetailDto);
    } catch (error: unknown) {
      console.error('Error  creating order detail:', error);

      const errorMessage =
        error instanceof Error ? error.message : 'Unknow error';
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Error: ${errorMessage}`,
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('orderDetail')
  async findAll() {
    try {
      return await this.orderDetailsService.findAll();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknow error';
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Error: ${errorMessage}`,
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrdersDetailDto,
  ) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
