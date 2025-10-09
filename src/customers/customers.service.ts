import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.create(createCustomerDto);
  }

  findAll() {
    return `This action returns all customers`;
  }

  async findOne(customerid: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { customerid },
      relations: ['shopping'],
    });
    if (!customer)
      throw new NotFoundException(`Customer #${customerid} not found`);
    return customer;
  }

  async update(customerid: number, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepository.update(customerid, updateCustomerDto);
    return this.findOne(customerid);
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
