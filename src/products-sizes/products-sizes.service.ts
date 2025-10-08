import { Injectable } from '@nestjs/common';
import { CreateProductsSizeDto } from './dto/create-products-size.dto';
import { UpdateProductsSizeDto } from './dto/update-products-size.dto';

@Injectable()
export class ProductsSizesService {
  create(createProductsSizeDto: CreateProductsSizeDto) {
    return 'This action adds a new productsSize';
  }

  findAll() {
    return `This action returns all productsSizes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsSize`;
  }

  update(id: number, updateProductsSizeDto: UpdateProductsSizeDto) {
    return `This action updates a #${id} productsSize`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsSize`;
  }
}
