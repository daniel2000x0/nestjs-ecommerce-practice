import {
  Body,
  ConflictException,
  Controller,
  //Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { OAuthTokenDto } from './dto/oauth-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Body() login: LoginUserDto) {
    return await this.authService.login(login);
  }
  @Post('admin')
  async registerAdmin(
    @Res() response,
    @Body(new ValidationPipe()) createUser: CreateUserDto,
  ) {
    try {
      const newUser = await this.userService.Register(createUser); // <- await
      return response.status(201).json({
        message: 'Administrador creado correctamente',
        user: newUser.user,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        return response.status(HttpStatus.CONFLICT).json({
          message: error.message,
          statusCode: 409,
        });
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error en el servidor',
        error: error.message,
        statusCode: 500,
      });
    }
  }

  @Post('registrar')
  async registerUser(
    @Res() response,
    @Body(new ValidationPipe()) createUser: CreateUserDto,
  ) {
    try {
      const newUser = await this.userService.Register(createUser); // <- await
      return response.status(201).json({
        message: 'Usuario creado correctamente',
        user: newUser.user,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        return response.status(HttpStatus.CONFLICT).json({
          message: error.message,
          statusCode: 409,
        });
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error en el servidor',
        error: error.message,
        statusCode: 500,
      });
    }
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.authService.refreshToken(req.user);
  }

  @Post('oauth/token')
  async oauth2Token(
    @Body(new ValidationPipe({ whitelist: true }))
    body: OAuthTokenDto,
  ) {
    const {
      grant_type,
      username,
      password,
      refresh_token,
      client_id,
      client_secret,
    } = body;

    return this.authService.oauth2Token(
      grant_type,
      username,
      password,
      refresh_token,
      client_id,
      client_secret,
    );
  }
}
