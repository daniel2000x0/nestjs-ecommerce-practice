import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
    private readonly usersn: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(user: LoginUserDto) {
    const { userpassword, useremail } = user;
    const findUser = await this.usersn.findOne(useremail);
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(userpassword, findUser.userpassword);
    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
    const payload = { id: findUser.userid, name: findUser.userfirstname };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // 7 días
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // 7 días
    });
    const data = {
      user: findUser,
      token,
      refreshToken,
    };
    return data;
  }
  //  metodo   para  validar   otro metodo de  validar usuario  aun que   ya se valdia dentro de la  funcion  registrar
  async validateUser(username: string, password: string) {
    const user = await this.usersn.findOneWithUserName(username);
    if (!user) throw new HttpException('USER_NOT_FOUND', 404);
    const checkPassword = await compare(password, user.userpassword);
    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userpassword: _, ...result } = user;
    return result;
  }

  refreshToken(user: User) {
    const payload = { id: user.userid, name: user.userfirstname };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d', // 7 días
      }),
    };
  }
}
