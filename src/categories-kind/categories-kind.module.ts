import { Module } from '@nestjs/common';
import { CategoriesKindService } from './categories-kind.service';
import { CategoriesKindController } from './categories-kind.controller';

@Module({
  controllers: [CategoriesKindController],
  providers: [CategoriesKindService],
})
export class CategoriesKindModule {}
