import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  orderid: number;

  @IsInt()
  @IsNotEmpty()
  customerid: number;
  @IsInt()
  @IsNotEmpty()
  customercountry: number;
  @IsString()
  @IsNotEmpty()
  customerName: string;

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
}
