import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const createdproduc: Product =
      this.productRepository.create(createProductDto);

    // Guardar en la base de datos
    return await this.productRepository.save(createdproduc);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updateproduct = await this.productRepository.findOne({
      where: { productid: id },
    });
    if (!updateproduct) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    Object.assign(updateproduct, updateProductDto);
    return await this.productRepository.save(updateproduct);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
