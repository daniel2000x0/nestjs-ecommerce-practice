import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsColorDto } from './create-products-color.dto';

export class UpdateProductsColorDto extends PartialType(CreateProductsColorDto) {}
