import { Injectable } from '@nestjs/common';
import { CreateProductsColorDto } from './dto/create-products-color.dto';
import { UpdateProductsColorDto } from './dto/update-products-color.dto';

@Injectable()
export class ProductsColorsService {
  create(createProductsColorDto: CreateProductsColorDto) {
    return 'This action adds a new productsColor';
  }

  findAll() {
    return `This action returns all productsColors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsColor`;
  }

  update(id: number, updateProductsColorDto: UpdateProductsColorDto) {
    return `This action updates a #${id} productsColor`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsColor`;
  }
}
