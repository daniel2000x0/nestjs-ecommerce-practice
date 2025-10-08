import { Injectable } from '@nestjs/common';
import { CreateCategoriesKindDto } from './dto/create-categories-kind.dto';
import { UpdateCategoriesKindDto } from './dto/update-categories-kind.dto';

@Injectable()
export class CategoriesKindService {
  create(createCategoriesKindDto: CreateCategoriesKindDto) {
    return 'This action adds a new categoriesKind';
  }

  findAll() {
    return `This action returns all categoriesKind`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesKind`;
  }

  update(id: number, updateCategoriesKindDto: UpdateCategoriesKindDto) {
    return `This action updates a #${id} categoriesKind`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesKind`;
  }
}
