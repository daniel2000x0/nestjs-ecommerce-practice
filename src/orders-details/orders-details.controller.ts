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
  UseGuards,
} from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { CreateOrdersDetailDto } from './dto/create-orders-detail.dto';
import { UpdateOrdersDetailDto } from './dto/update-orders-detail.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleEnum } from 'common/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders-details')
export class OrdersDetailsController {
  constructor(private readonly orderDetailsService: OrdersDetailsService) {}
  @Roles(RoleEnum.CUSTOMER, RoleEnum.ADMIN)
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
  @Roles(RoleEnum.CUSTOMER, RoleEnum.ADMIN)
  @Get('orderDetail')
  findAll() {
    try {
      return this.orderDetailsService.findAll();
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
  @Roles(RoleEnum.CUSTOMER, RoleEnum.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(+id);
  }
  @Roles(RoleEnum.CUSTOMER, RoleEnum.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrdersDetailDto,
  ) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @Roles(RoleEnum.CUSTOMER, RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
