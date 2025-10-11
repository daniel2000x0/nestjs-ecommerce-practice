import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    // instancia  el  repositorio  de  shopping card para almacenar    los  datos
    private readonly userCartRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { userpassword } = createUserDto;
    const plainToHash = await hash(userpassword, 10);
    const userData: CreateUserDto = {
      ...createUserDto,
      userpassword: plainToHash,
    };
    const createdUser: User = this.userCartRepository.create(userData);

    // Guardar en la base de datos
    return await this.userCartRepository.save(createdUser);
  }
  async login(user: LoginUserDto) {
    const { userpassword, useremail } = user;
    const findUser = await this.userCartRepository.findOne({
      where: { useremail },
    });
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(userpassword, findUser.userpassword);
    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
    const payload = { id: findUser.userid, name: findUser.userfirstname };
    const token = this.jwtService.sign(payload);
    const data = {
      user: findUser,
      token,
    };
    return data;
  }

  findAll() {
    return this.userCartRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateduser = await this.userCartRepository.findOne({
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
    return await this.userCartRepository.save(updateduser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
