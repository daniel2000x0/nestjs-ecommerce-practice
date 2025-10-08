import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateShoppingCartDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  customerid: number;

  /** 🔗 Lista de productos que se agregan al carrito */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsArray({ message: 'Debe proporcionar una lista de productos' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ArrayNotEmpty({ message: 'La lista de productos no puede estar vacía' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ArrayMinSize(1, { message: 'Debe agregar al menos un producto' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => Number)
  productids: number[];
}
