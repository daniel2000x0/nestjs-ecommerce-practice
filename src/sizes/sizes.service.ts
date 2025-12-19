import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Injectable()
export class SizesService {
  create(createSizeDto: CreateSizeDto) {
    console.log(createSizeDto);
    return 'This action adds a new size';
  }

  findAll() {
    return `This action returns all sizes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} size`;
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    console.log(updateSizeDto);
    return `This action updates a #${id} size`;
  }

  remove(id: number) {
    return `This action removes a #${id} size`;
  }
}
