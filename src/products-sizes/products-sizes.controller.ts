import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsSizesService } from './products-sizes.service';
import { CreateProductsSizeDto } from './dto/create-products-size.dto';
import { UpdateProductsSizeDto } from './dto/update-products-size.dto';

@Controller('products-sizes')
export class ProductsSizesController {
  constructor(private readonly productsSizesService: ProductsSizesService) {}

  @Post()
  create(@Body() createProductsSizeDto: CreateProductsSizeDto) {
    return this.productsSizesService.create(createProductsSizeDto);
  }

  @Get()
  findAll() {
    return this.productsSizesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsSizesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsSizeDto: UpdateProductsSizeDto) {
    return this.productsSizesService.update(+id, updateProductsSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsSizesService.remove(+id);
  }
}
