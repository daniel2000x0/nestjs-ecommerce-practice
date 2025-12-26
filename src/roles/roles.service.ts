import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRole } from 'src/users-roles/entities/users-role.entity';
import { DataSource, Repository } from 'typeorm';
import { UserRole } from 'src/auth/interfaces/role-enum';
import { RoleEnum } from 'common/enums/rol.enum';

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

  async findOne(userId: number): Promise<UserRole[]> {
    const resultado: { roleid: number }[] = await this.datasource.query(
      'SELECT ur.roleid FROM users_roles ur WHERE ur.userid = $1',
      [userId],
    );

    // mapear a UserRole
    return resultado.map((r) => ({
      roleId: r.roleid as RoleEnum, // convertir a enum
    }));
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    console.log(updateRoleDto);
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
