import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { OAuthTokenDto } from './dto/oauth-token.dto';
import { Roles } from './decorators/roles.decorator';
import { RoleEnum } from 'common/enums/rol.enum';
import { CustomersService } from 'src/customers/customers.service';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
    private readonly customerServic: CustomersService,
  ) {}
  @Roles(RoleEnum.ADMIN)
  @Post('login')
  async loginUser(@Body() login: LoginUserDto) {
    return await this.authService.login(login);
  }

  @Post('registrar')
  async registerCustomer(
    @Body(new ValidationPipe()) createUser: CreateCustomerDto,
  ) {
    try {
      const newUser = await this.customerServic.register(createUser); // <- await
      return {
        message: 'Usuario creado correctamente',
        user: newUser.customer.firstName,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        return {
          message: error.message,
          statusCode: 409,
        };
      }

      return {
        message: 'Error en el servidor',
        error: error.message,
        statusCode: 500,
      };
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
