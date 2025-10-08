import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsColorsService } from './products-colors.service';
import { CreateProductsColorDto } from './dto/create-products-color.dto';
import { UpdateProductsColorDto } from './dto/update-products-color.dto';

@Controller('products-colors')
export class ProductsColorsController {
  constructor(private readonly productsColorsService: ProductsColorsService) {}

  @Post()
  create(@Body() createProductsColorDto: CreateProductsColorDto) {
    return this.productsColorsService.create(createProductsColorDto);
  }

  @Get()
  findAll() {
    return this.productsColorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsColorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsColorDto: UpdateProductsColorDto) {
    return this.productsColorsService.update(+id, updateProductsColorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsColorsService.remove(+id);
  }
}
