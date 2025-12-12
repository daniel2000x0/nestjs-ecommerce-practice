import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrdersDetailDto } from 'src/orders-details/dto/ordenDetail.dto';

export class CreateOrderDto {
  //@IsInt()
  //@IsOptional()
  // orderid?: number;

  @IsInt()
  @IsNotEmpty()
  customerid: number;

  @IsInt()
  @IsNotEmpty()
  customercountry: number;

  @IsString()
  @IsNotEmpty()
  customername: string;

  @IsString()
  @IsNotEmpty()
  customercity: string;

  @IsString()
  @IsNotEmpty()
  customerregion: string;

  @IsString()
  @IsNotEmpty()
  customerzip: string;

  @IsString()
  @IsNotEmpty()
  customeraddress: string;

  @IsString()
  @IsNotEmpty()
  customerphone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => OrdersDetailDto)
  orderDetails: OrdersDetailDto[];
}
