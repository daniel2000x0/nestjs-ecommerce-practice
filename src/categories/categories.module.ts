import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { CategoriesKind } from 'src/categories-kind/entities/categories-kind.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, CategoriesKind])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
