import { Injectable } from '@nestjs/common';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { UpdateManufactureDto } from './dto/update-manufacture.dto';

@Injectable()
export class ManufacturesService {
  create(createManufactureDto: CreateManufactureDto) {
    return 'This action adds a new manufacture';
  }

  findAll() {
    return `This action returns all manufactures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manufacture`;
  }

  update(id: number, updateManufactureDto: UpdateManufactureDto) {
    return `This action updates a #${id} manufacture`;
  }

  remove(id: number) {
    return `This action removes a #${id} manufacture`;
  }
}
