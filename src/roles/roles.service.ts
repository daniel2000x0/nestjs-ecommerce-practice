import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRole } from 'src/users-roles/entities/users-role.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(UsersRole)
    private readonly usersRoleRepository: Repository<UsersRole>,
    private readonly datasource: DataSource,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    console.log(createRoleDto);
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: number) {
    const resultado = await this.datasource.query(
      'select ur.roleid  from  users_roles ur   where ur.userid =  $1',
      [id],
    );
    return resultado;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    console.log(updateRoleDto);
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
