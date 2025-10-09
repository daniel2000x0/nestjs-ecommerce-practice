import { Module } from '@nestjs/common';
import { CategoriesKindService } from './categories-kind.service';
import { CategoriesKindController } from './categories-kind.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesKindController],
  providers: [CategoriesKindService],
})
export class CategoriesKindModule {}
