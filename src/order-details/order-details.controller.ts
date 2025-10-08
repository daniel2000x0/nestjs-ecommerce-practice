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
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post('orderDetail')
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
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
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
