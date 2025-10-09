import { Module } from '@nestjs/common';
import { ProductsColorsService } from './products-colors.service';
import { ProductsColorsController } from './products-colors.controller';
import { Color } from 'src/colors/entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ProductsColorsController],
  providers: [ProductsColorsService],
})
export class ProductsColorsModule {}
