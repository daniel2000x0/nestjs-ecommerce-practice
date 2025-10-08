import { IsArray, IsNumber, IsPositive, Min } from 'class-validator';
import { ArrayNotEmpty } from 'class-validator/types/decorator/array/ArrayNotEmpty';
import { IsInt } from 'class-validator/types/decorator/typechecker/IsInt';

export class CreateOrderDetailDto {
  @IsInt()
  orderid: number;
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  productid: number[];
  @IsNumber()
  @IsPositive()
  price: number;
  @IsInt()
  @Min(1)
  quantity: number;
  @IsNumber()
  @Min(0)
  discount: number;
}
