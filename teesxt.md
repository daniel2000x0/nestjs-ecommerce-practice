  
  private createOAuthPayload(user: any, roles: any[], client_id: string) {
    return {
      sub: user.userid, // OAuth2 estándar
      name: user.userfirstname,
      email: user.useremail,
      roles: roles,
      client_id: client_id,
      scope: this.getUserScopes(roles),
      iss: this.configService.get('APP_URL', 'http://localhost:3000'),
      aud: client_id,
    };
  }
   private async issuetokencustomer(customer: any, client_id: string) {
    const customerr = await this.customerService.findOne(customer.customerid);

    if (!customerr) {
      throw new NotFoundException('cUSTOMER NO ENCONTRADO ');
    }

    const payload = {
      sub: customerr.customerid,
      type: 'customer',
      email: customerr.email,
      name: customerr.firstName,
      client_id,
    };

    return this.generateTokens(payload);
  }
    // async oauth2Token(
  // grant_type: string,
  // username?: string,
  // password?: string,
  //  refresh_token?: string,
  // client_id?: string,
  //client_secret?: string,
  //) {
  // 1. Validar credenciales del cliente
  //  const isValidClient = await this.validateClient(client_id, client_secret);
  ///  if (!isValidClient) {
  //   throw new UnauthorizedException('INVALID_CLIENT_CREDENTIALS');
  //  }

  // 2. Procesar según grant_type
  // switch (grant_type) {
  //  case 'password':
  //   return await this.handlePasswordGrant(username, password, client_id);

  // case 'refresh_token':
  //  return await this.handleRefreshTokenGrant(refresh_token, client_id);

  // case 'client_credentials':
  //  return await this.handleClientCredentialsGrant(client_id);

  // default:
  //    throw new UnauthorizedException('UNSUPPORTED_GRANT_TYPE');
  // }
  //}

  
  
  ///private getUserScopes(roles: any[]): string {
  //  const scopes = ['read'];

  // if (roles.includes('ADMIN') || roles.includes('MANAGER')) {
  //   scopes.push('write');
  // }
  // if (roles.includes('ADMIN')) {
  //  scopes.push('admin');
  // }

  // return scopes.join(' ');
  //}
 
 
 
   //// async introspectToken(token: string): Promise<any> {
  //  try {
  //   const payload = await this.jwtService.verifyAsync(token, {
  //    secret: this.configService.get('JWT_SECRET'),
  //  });

  // return {
  //   active: true,
  // client_id: payload.client_id,
  //  username: payload.email,
  // sub: payload.sub,
  // / exp: payload.exp,
  // iat: payload.iat,
  //  scope: payload.scope,
  //  token_type: 'Bearer',
  //  };
  //} catch (error) {
  //   console.log(error);
  //   return { active: false };
  ////  }
  // }

  //async revokeToken(token: string): Promise<void> {
  // Implementar blacklist si es necesario
  // await this.tokenBlacklistService.add(token);
  //}

  // async getUserById(userId: number): Promise<any> {
  ////   const user = await this.usersService.findOne(userId);
  // if (!user) return null;

  // const userRoles = await this.rolUserService.findByUserId(user.userid);
  //  const roles = userRoles.map((role) => role.roleid);

  //  return {
  //   ...this.sanitizeUser(user),
  //  roles: roles,
  // };
  //}//

  // =========================================================================
  // 2. HANDLERS PARA CADA GRANT TYPE
  // =========================================================================

  // private async handlePasswordGrant(
  // username: string,
  // password: string,
  // client_id: string,
  // ) {
  // Validar usuario
  // const user = await this.validateUser(username, password);

  // Obtener roles del usuario
  //  const userRoles = await this.rolUserService.findByUserId(user.userid);
  // const roles = userRoles.map((role) => role.roleid);

  // Crear payload OAuth2 estándar
  // const payload = this.createOAuthPayload(user, roles, client_id);

  // Generar tokens
  // const { access_token, refresh_token, expires_in } =
  //  this.generateTokens(payload);

  // Respuesta OAuth2 estándar
  // return {
  //  // access_token,
  // refresh_token,
  // token_type: 'bearer',
  // expires_in,
  //scope: this.getUserScopes(roles),
  //   user: {
  //   id: user.userid,
  //    name: user.userfirstname,
  ////    email: user.useremail,
  // },
  // };
  //  }

  // private async handleRefreshTokenGrant(
  // refresh_token: string,
  //  client_id: string,
  // ) {
  // try {
  //   // Verificar refresh token
  //   const payload = await this.verifyRefreshToken(refresh_token);

  // Buscar usuario
  //  const user = await this.usersService.findById(payload.sub);
  // if (!user) {
  //    throw new UnauthorizedException('USER_NOT_FOUND');
  //  }

  // Obtener roles actualizados
  //    const userRoles = await this.rolUserService.findByUserId(user.userid);
  //   const roles = userRoles.map((role) => role.roleid);

  // Nuevo payload
  //   const newPayload = this.createOAuthPayload(user, roles, client_id);

  // Generar nuevos tokens
  //   const {
  //    access_token,
  //    refresh_token: new_refresh_token,
  //   expires_in,
  // } = this.generateTokens(newPayload);

  // return {
  //  access_token,
  ////   refresh_token: new_refresh_token,
  // token_type: 'bearer',
  //  expires_in,
  // };
  // } /catch (error) {
  //   console.log(error);
  //  throw new UnauthorizedException('INVALID_REFRESH_TOKEN');
  // }
  
  
  /* private async passwordGrant(
    username: string,
    password: string,
    client_id: string,
  ) {
    // Validar usuario (YA IMPLEMENTADO)
    const user = await this.validateUser(username, password);

    // Generar tokens (YA IMPLEMENTADO)
    const { access_token, refresh_token, expires_in } = await this.issueTokens(
      user,
      client_id,
    );

    return {
      access_token,
      refresh_token,
      token_type: 'bearer',
      expires_in,
      scope: this.getUserScopes(
        (await this.rol_user.findOne(user.userid)).map((r) => r.roleid),
      ),
      user: {
        id: user.userid,
        email: user.useremail,
        name: user.userfirstname,
      },
    };
  }
*/
    // const findUser = await this.usersService.findOne(useremail);
    //if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    //const checkPassword = await compare(userpassword, findUser.userpassword);
    /// if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
    ///const userRoles = await this.rol_user.findOne(findUser.userid);

    ///const onerol = userRoles.map((role) => role.roleid);
    // const payload = {
    // id: findUser.userid,
    // name: findUser.userfirstname,
    //  roles: onerol,
    //};
    // console.log(userRoles);
    //const token = this.jwtService.sign(payload, {
    // secret: process.env.JWT_SECRET,
    // expiresIn: '7d', // 7 días
    //});
    // const refreshToken = this.jwtService.sign(payload, {
    //  secret: process.env.JWT_REFRESH_SECRET,
    // expiresIn: '7d', // 7 días
    //});
    // const data = {
    //  user: findUser,
    // token,
    //  refreshToken,
    //};
    /// return data;
 
 
 
  setSession(customer: Customer, token: string): void {
    this._token = token;
    localStorage.setItem('currentCustomer', JSON.stringify(customer));
    localStorage.setItem('access_token', token);
    this.currentCustomerSubject.next(customer);
  }



async Register(
  createUserDto: CreateUserDto,
): Promise<{ message: string; user: Omit<User, 'userpassword'> }> {
  try {
    const hashedPassword = await hash(createUserDto.userpassword, 10);

    const existingUser = await this.userService.findOne({
      where: { useremail: createUserDto.useremail },
    });

    if (existingUser) {
      throw new ConflictException(
        `El correo "${createUserDto.useremail}" ya está registrado`,
      );
    }

    return await this.dataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(User);
      const userRoleRepo = manager.getRepository(UsersRole);

      const user = userRepo.create({
        ...createUserDto,
        userpassword: hashedPassword,
      });

      const savedUser = await userRepo.save(user);

      const userRole = userRoleRepo.create({
        userid: savedUser, // mejor así
        roleid: { roleid: RoleEnum.CUSTOMER },
      });

      await userRoleRepo.save(userRole);

      const { userpassword, ...userWithoutPassword } = savedUser;

      return {
        message: 'Usuario creado correctamente',
        user: userWithoutPassword,
      };
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);

    if (error.code === '23505') {
      throw new ConflictException(
        `El correo "${createUserDto.useremail}" ya está registrado`,
      );
    }

    throw new InternalServerErrorException('Error al crear el usuario');
  }
}









import { Gender } from 'src/genders/entities/gender.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ShoppingCart } from 'src/shopping-cart/entities/shopping-cart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'serial' })
  serial: number;

  @Column({ type: 'int', unique: true, name: 'customerid' })
  customerId: number;

  @Column({ type: 'varchar', length: 20, name: 'customerfirstname' })
  firstName: string;

  @Column({ type: 'varchar', length: 20, name: 'customerlastname' })
  lastName: string;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'customeremail' })
  email: string;

  @Column({
    type: 'char',
    length: 60,
    name: 'customerpassword',
    select: false,
  })
  password: string;

  @Column({ type: 'date', name: 'customerbirthdate' })
  birthDate: Date;

  @ManyToOne(() => Gender, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'customergender', referencedColumnName: 'genderid' })
  gender: Gender;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'customercreateddate',
    default: () => 'now()',
  })
  createdAt: Date;
  @OneToMany(() => ShoppingCart, (shopping) => shopping.customer)
  shopping: ShoppingCart[];
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}


MEJORA 2 (OPCIONAL): NORMALIZAR ROLES EN JWT

La mejor práctica es que el JWT ya tenga los roles como enum:

roles: [RoleEnum.ADMIN, RoleEnum.USER]


Así podrías simplificar TODO a esto 👇

const userRoles: RoleEnum[] = user.roles;

const hasRole = rolest.some(role =>
  userRoles.includes(role),
);


Y eliminar extractRoleIds completamente.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
 


 export const SCOPES_KEY = 'scopes';
export const Scopes = (...scopes: string[]) =>
  SetMetadata(SCOPES_KEY, scopes);
  

  @Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(
      SCOPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredScopes) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredScopes.includes(user.scope);
  }
}

POST /auth/oauth/token
{
  "grant_type": "password",
  "username": "user@email.com",
  "password": "123456",
  "client_id": "frontend",
  "client_secret": "secret123"
}
POST /auth/oauth/token
{
  "grant_type": "refresh_token",
  "refresh_token": "eyJhbGciOi...",
  "client_id": "frontend",
  "client_secret": "secret123"
}





// auth/auth.service.ts
import { Injectable, HttpException, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RolUserService } from '../rol_user/rol_user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
    
    @Inject(RolUserService)
    private rolUserService: RolUserService,
    
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // =========================================================================
  // 1. MÉTODO OAUTH2 PRINCIPAL
  // =========================================================================

  async oauth2Token(
    grant_type: string,
    username?: string,
    password?: string,
    refresh_token?: string,
    client_id?: string,
    client_secret?: string,
  ) {
    // 1. Validar credenciales del cliente
    const isValidClient = await this.validateClient(client_id, client_secret);
    if (!isValidClient) {
      throw new UnauthorizedException('INVALID_CLIENT_CREDENTIALS');
    }

    // 2. Procesar según grant_type
    switch (grant_type) {
      case 'password':
        return await this.handlePasswordGrant(username, password, client_id);
      
      case 'refresh_token':
        return await this.handleRefreshTokenGrant(refresh_token, client_id);
      
      case 'client_credentials':
        return await this.handleClientCredentialsGrant(client_id);
      
      default:
        throw new UnauthorizedException('UNSUPPORTED_GRANT_TYPE');
    }
  }

  // =========================================================================
  // 2. HANDLERS PARA CADA GRANT TYPE
  // =========================================================================

  private async handlePasswordGrant(username: string, password: string, client_id: string) {
    // Validar usuario
    const user = await this.validateUser(username, password);
    
    // Obtener roles del usuario
    const userRoles = await this.rolUserService.findByUserId(user.userid);
    const roles = userRoles.map((role) => role.roleid);
    
    // Crear payload OAuth2 estándar
    const payload = this.createOAuthPayload(user, roles, client_id);

    // Generar tokens
    const { access_token, refresh_token, expires_in } = this.generateTokens(payload);

    // Respuesta OAuth2 estándar
    return {
      access_token,
      refresh_token,
      token_type: 'bearer',
      expires_in,
      scope: this.getUserScopes(roles),
      user: {
        id: user.userid,
        name: user.userfirstname,
        email: user.useremail,
      },
    };
  }

  private async handleRefreshTokenGrant(refresh_token: string, client_id: string) {
    try {
      // Verificar refresh token
      const payload = await this.verifyRefreshToken(refresh_token);

      // Buscar usuario
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('USER_NOT_FOUND');
      }

      // Obtener roles actualizados
      const userRoles = await this.rolUserService.findByUserId(user.userid);
      const roles = userRoles.map((role) => role.roleid);

      // Nuevo payload
      const newPayload = this.createOAuthPayload(user, roles, client_id);

      // Generar nuevos tokens
      const { access_token, refresh_token: new_refresh_token, expires_in } = 
        this.generateTokens(newPayload);

      return {
        access_token,
        refresh_token: new_refresh_token,
        token_type: 'bearer',
        expires_in,
      };
    } catch (error) {
      throw new UnauthorizedException('INVALID_REFRESH_TOKEN');
    }
  }

  private async handleClientCredentialsGrant(client_id: string) {
    const payload = {
      sub: client_id,
      client_id: client_id,
      grant_type: 'client_credentials',
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h'),
    });

    return {
      access_token,
      token_type: 'bearer',
      expires_in: 3600,
      scope: 'api',
    };
  }

  // =========================================================================
  // 3. MÉTODOS DE AUTENTICACIÓN TRADICIONAL (para compatibilidad)
  // =========================================================================

  async login(loginUserDto: LoginUserDto) {
    const { userpassword, useremail } = loginUserDto;
    
    // Buscar usuario
    const findUser = await this.usersService.findByEmail(useremail);
    if (!findUser) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }

    // Verificar contraseña
    const checkPassword = await compare(userpassword, findUser.userpassword);
    if (!checkPassword) {
      throw new HttpException('PASSWORD_INVALID', 403);
    }

    // Obtener roles
    const userRoles = await this.rolUserService.findByUserId(findUser.userid);
    const roles = userRoles.map((role) => role.roleid);

    // Crear payload tradicional
    const payload = {
      id: findUser.userid,
      name: findUser.userfirstname,
      email: findUser.useremail,
      roles: roles,
    };

    // Generar tokens tradicionales
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '7d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return {
      user: this.sanitizeUser(findUser),
      token,
      refreshToken,
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }

    const checkPassword = await compare(password, user.userpassword);
    if (!checkPassword) {
      throw new HttpException('PASSWORD_INVALID', 403);
    }

    return this.sanitizeUser(user);
  }

  refreshToken(user: User) {
    const payload = { 
      id: user.userid, 
      name: user.userfirstname,
      email: user.useremail,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1h',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    };
  }

  // =========================================================================
  // 4. MÉTODOS AUXILIARES
  // =========================================================================

  private createOAuthPayload(user: any, roles: any[], client_id: string) {
    return {
      sub: user.userid,           // OAuth2 estándar
      name: user.userfirstname,
      email: user.useremail,
      roles: roles,
      client_id: client_id,
      scope: this.getUserScopes(roles),
      iss: this.configService.get('APP_URL', 'http://localhost:3000'),
      aud: client_id,
    };
  }

  private generateTokens(payload: any) {
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    const expires_in = this.calculateExpiresIn(
      this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h')
    );

    return { access_token, refresh_token, expires_in };
  }

  private calculateExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/(\d+)([smhd])/);
    if (!match) return 3600;

    const [, amount, unit] = match;
    const amountNum = parseInt(amount, 10);

    switch (unit) {
      case 's': return amountNum;
      case 'm': return amountNum * 60;
      case 'h': return amountNum * 3600;
      case 'd': return amountNum * 86400;
      default: return 3600;
    }
  }

  private getUserScopes(roles: any[]): string {
    const scopes = ['read'];
    
    if (roles.includes('ADMIN') || roles.includes('MANAGER')) {
      scopes.push('write');
    }
    if (roles.includes('ADMIN')) {
      scopes.push('admin');
    }
    
    return scopes.join(' ');
  }

  private async validateClient(client_id: string, client_secret: string): Promise<boolean> {
    const validClientId = this.configService.get('OAUTH_CLIENT_ID');
    const validClientSecret = this.configService.get('OAUTH_CLIENT_SECRET');
    
    return client_id === validClientId && client_secret === validClientSecret;
  }

  private sanitizeUser(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userpassword, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  private async verifyRefreshToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
  }

  // =========================================================================
  // 5. MÉTODOS PARA GUARDS Y ESTRATEGIAS
  // =========================================================================

  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) return null;

      const userRoles = await this.rolUserService.findByUserId(user.userid);
      const roles = userRoles.map((role) => role.roleid);

      return {
        ...this.sanitizeUser(user),
        roles: roles,
        client_id: payload.client_id,
        scope: payload.scope,
      };
    } catch (error) {
      return null;
    }
  }

  async introspectToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      return {
        active: true,
        client_id: payload.client_id,
        username: payload.email,
        sub: payload.sub,
        exp: payload.exp,
        iat: payload.iat,
        scope: payload.scope,
        token_type: 'Bearer',
      };
    } catch (error) {
      return { active: false };
    }
  }

  async revokeToken(token: string): Promise<void> {
    // Implementar blacklist si es necesario
    // await this.tokenBlacklistService.add(token);
  }

  async getUserById(userId: number): Promise<any> {
    const user = await this.usersService.findById(userId);
    if (!user) return null;

    const userRoles = await this.rolUserService.findByUserId(user.userid);
    const roles = userRoles.map((role) => role.roleid);

    return {
      ...this.sanitizeUser(user),
      roles: roles,
    };
  }
}


----controller  // auth/auth.controller.ts (tradicional)
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from './decorators/oauth-auth.decorator';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    // Implementar lógica para refresh token tradicional
    return { message: 'Refresh token endpoint' };
  }
}

// auth/oauth.controller.ts (OAuth2)
import { 
  Controller, 
  Post, 
  Body, 
  Headers, 
  HttpCode, 
  HttpStatus, 
  UseGuards,
  Get,
  Query,
  Res,
  Req 
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from './decorators/oauth-auth.decorator';
import { LocalOAuthGuard } from './strategies/local-oauth.strategy';
import { AuthService } from './auth.service';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalOAuthGuard)
  async token(@Req() req: any) {
    const user = req.user;
    const client_id = user.client_id;
    
    return this.authService['handlePasswordGrant'](
      user.useremail || user.username,
      '', // La contraseña ya fue validada
      client_id
    );
  }

  @Post('token/refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body('refresh_token') refresh_token: string,
    @Headers('authorization') authHeader: string,
  ) {
    let client_id = '';
    let client_secret = '';

    if (authHeader && authHeader.startsWith('Basic ')) {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      [client_id, client_secret] = credentials.split(':');
    }

    return this.authService.oauth2Token(
      'refresh_token',
      undefined,
      undefined,
      refresh_token,
      client_id,
      client_secret,
    );
  }

  @Post('introspect')
  @Public()
  @HttpCode(HttpStatus.OK)
  async introspect(
    @Body('token') token: string,
    @Headers('authorization') authHeader: string,
  ) {
    let client_id = '';
    let client_secret = '';

    if (authHeader && authHeader.startsWith('Basic ')) {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      [client_id, client_secret] = credentials.split(':');
    }

    const isValidClient = await this.authService['validateClient'](client_id, client_secret);
    if (!isValidClient) {
      throw new UnauthorizedException('Invalid client credentials');
    }

    return this.authService.introspectToken(token);
  }

  @Get('authorize')
  @Public()
  async authorize(
    @Query('response_type') responseType: string,
    @Query('client_id') clientId: string,
    @Query('redirect_uri') redirectUri: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    // Redireccionar a página de login con parámetros OAuth2
    return res.redirect(
      `/login?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=${responseType}`
    );
  }

  @Get('userinfo')
  @HttpCode(HttpStatus.OK)
  async userInfo(@Req() req: any) {
    const user = req.user;
    return {
      sub: user.userid,
      name: user.userfirstname,
      email: user.useremail,
      roles: user.roles || [],
    };
  }
} 
// users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { OAuthAuth, OAuthRoles, Public } from '../../auth/decorators/oauth-auth.decorator';
import { RoleEnum } from 'common/enums/rol.enum';

@Controller('users')
export class UsersController {
  
  // ✅ Público
  @Get('public')
  @Public()
  getPublicInfo() {
    return { message: 'Información pública para todos' };
  }

  // ✅ Requiere autenticación
  @Get('profile')
  @OAuthAuth()
  getProfile(@Req() req: any) {
    return {
      message: 'Perfil del usuario',
      user: req.user,
    };
  }

  // ✅ Requiere rol específico
  @Get('admin-dashboard')
  @OAuthAuth([RoleEnum.ADMIN])
  getAdminDashboard() {
    return { message: 'Dashboard de administrador' };
  }

  // ✅ Requiere múltiples roles
  @Post('create')
  @OAuthAuth([RoleEnum.ADMIN, RoleEnum.MANAGER])
  createUser(@Body() userData: any) {
    return { 
      message: 'Usuario creado',
      data: userData 
    };
  }

  // ✅ Usando tu decorador original (compatibilidad)
  @Put(':id')
  @Auth([RoleEnum.ADMIN, RoleEnum.MANAGER])
  updateUser(@Param('id') id: string, @Body() updates: any) {
    return {
      message: 'Usuario actualizado',
      id,
      updates,
    };
  }

  // ✅ Protección por scopes
  @Delete(':id')
  @OAuthAuth([RoleEnum.ADMIN])
  async deleteUser(@Param('id') id: string, @Req() req: any) {
    return {
      message: 'Usuario eliminado',
      id,
      deletedBy: req.user.name,
    };
  }
}


# ========================
# JWT CONFIGURATION
# ========================
JWT_SECRET=tu_clave_super_secreta_para_access_token_32_bytes
JWT_REFRESH_SECRET=tu_clave_super_secreta_para_refresh_token_32_bytes
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# ========================
# OAUTH2 CONFIGURATION
# ========================
OAUTH_CLIENT_ID=myapp
OAUTH_CLIENT_SECRET=mysecret1234567890

# ========================
# APP CONFIGURATION
# ========================
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:4200
NODE_ENV=development