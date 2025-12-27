import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async register(
    dto: CreateCustomerDto,
  ): Promise<{ message: string; customer: Customer }> {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const validacion = await this.customerRepository.findOne({
        where: { email: dto.email },
      });
      if (validacion) {
        throw new ConflictException('correo  ya esta  registrado');
      }
      const customer = this.customerRepository.create({
        email: dto.email,
        password: hashedPassword, // 👈 se guarda hasheado
        firstName: dto.firstName,
        lastName: dto.lastName,
        birthDate: new Date(dto.birthDate),
        gender: { genderid: dto.genderId },
      });
      const valor = await this.customerRepository.save(customer);
      return {
        message: 'Usuario creado correctamente',
        customer: valor,
      };
    } catch (error) {
      console.error('Error al crear usuario:', error);

      // Si es un error de duplicidad de Postgres
      if (error.code === '23505') {
        throw new ConflictException(
          `El correo "${dto.email}" ya está registrado`,
        );
      }
      throw new InternalServerErrorException('No se pudo crear el usuario');
    }
  }
  findAll() {
    return `This action returns all customers`;
  }

  async findOne(customerid: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { customerid: customerid },
      relations: ['shoppingCarts'],
    });
    if (!customer)
      throw new NotFoundException(`Customer #${customerid} not found`);
    return customer;
  }
  async findemail(custommeremail: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { email: custommeremail },
      select: ['serial', 'customerid', 'email', 'password'],
    });
    if (!customer) {
      throw new NotFoundException('NO  se an encontrado   ususrio ');
    }
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
