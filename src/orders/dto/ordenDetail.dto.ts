import { IsInt, IsNumber, IsOptional, Min, Max } from 'class-validator';
export class OrdersDetailDto {
  @IsInt()
  orderid: number;

  @IsInt()
  productid: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  unitprice: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  discount?: number;
}
