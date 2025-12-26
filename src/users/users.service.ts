import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesAddDto } from './dto/rolesadd.dto';
import { UsersRole } from 'src/users-roles/entities/users-role.entity';
import { RoleEnum } from 'common/enums/rol.enum';

@Injectable()
export class UsersService {
  constructor(
    //@InjectRepository(User)
    // instancia  el  repositorio  de  shopping card para almacenar    los  datos
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userService: Repository<User>,
    @InjectRepository(UsersRole)
    private readonly userRoleService: Repository<UsersRole>,
  ) {}
  async findAll() {
    return await this.userService.find();
  }
  async roles(
    rol: RolesAddDto,
  ): Promise<{ message: string; save: UsersRole | null }> {
    try {
      let save: UsersRole | null = null;
      for (const roleId of rol.roleids) {
        const newUserRole: UsersRole = this.userRoleService.create({
          userid: { userid: rol.userid } as User,
          roleid: { roleid: roleId } as any,
        });
        save = await this.userRoleService.save(newUserRole);
      }
      return {
        message: 'Roles asignados correctamente',
        save,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al asignar roles');
    }
  }
  ///ERROR//
  //async;

  async Register(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    try {
      // Hashear la contraseña
      const hashedPassword = await hash(createUserDto.userpassword, 10);

      // Verificar si el email ya existe
      const existingUser = await this.userService.findOne({
        where: { useremail: createUserDto.useremail },
      });

      if (existingUser) {
        throw new ConflictException(
          `El correo "${createUserDto.useremail}" ya está registrado`,
        );
      }
      return await this.dataSource.transaction(async (manager) => {
        const userepo = manager.getRepository(User);
        const userrolrepo = manager.getRepository(UsersRole);
        const newUser: User = userepo.create({
          ...createUserDto,
          userpassword: hashedPassword,
        });
        // Guardar en la base de datos
        const savedUser = await userepo.save(newUser);
        const userrol = userrolrepo.create({
          userid: { userid: savedUser.userid },
          roleid: { roleid: RoleEnum.CUSTOMER },
        });
        const rolsaved = await userrolrepo.save(userrol);
        // Retornar mensaje de éxito
        console.log(rolsaved);
        return {
          message: 'Usuario creado correctamente',
          user: savedUser,
        };
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);

      // Si es un error de duplicidad de Postgres
      if (error.code === '23505') {
        throw new ConflictException(
          `El correo "${createUserDto.useremail}" ya está registrado`,
        );
      }

      // Cualquier otro error inesperado
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }
  async findOne(email: string) {
    return await this.userService.findOne({
      where: { useremail: email },
    });
  }
  async finId(id: number) {
    return await this.userService.findOne({
      where: { userid: id },
    });
  }
  async findOneWithUserName(userName: string) {
    return await this.userService.findOne({
      where: { useremail: userName },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateduser = await this.userService.findOne({
      where: { userid: id },
    });
    if (!updateduser) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    // Si hay actualización de contraseña, hacer hash
    if (updateUserDto.userpassword) {
      const hashedPassword = await hash(updateUserDto.userpassword, 10);
      updateUserDto.userpassword = hashedPassword;
    }

    // Mezclar los datos nuevos en la entidad existente
    Object.assign(updateduser, updateUserDto);

    // Guardar cambios
    return await this.userService.save(updateduser);
  }
}
