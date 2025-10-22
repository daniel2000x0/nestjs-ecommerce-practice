import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { RegisterUserDto } from './dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    // instancia  el  repositorio  de  shopping card para almacenar    los  datos
    private readonly userService: Repository<User>,
  ) {}
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

      // Preparar los datos del usuario
      const userData: RegisterUserDto = {
        ...createUserDto,
        userpassword: hashedPassword,
      };

      const newUser: User = this.userService.create(userData);

      // Guardar en la base de datos
      const savedUser = await this.userService.save(newUser);

      // Retornar mensaje de éxito
      return {
        message: 'Usuario creado correctamente',
        user: savedUser,
      };
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
