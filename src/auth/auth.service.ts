import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { ConfigService } from '@nestjs/config';
import { CustomersService } from 'src/customers/customers.service';
import { AuthEntityMapper } from './mappers/auth-entity.mapper';
import { AuthEntity } from './interfaces/auth-entity.interface';
import { Scope } from './constants/scopes.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RoleEnum } from 'common/enums/rol.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly customerService: CustomersService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => RolesService))
    private readonly rol_user: RolesService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<AuthEntity> {
    const user = await this.usersService.findOneWithUserName(username);
    const customer = await this.customerService.findemail(username);

    if (!customer && !user) {
      throw new HttpException('USER_INVALID', 403);
    }
    if (user) {
      const checkPassword = await compare(password, user.userpassword);
      if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userpassword: _, ...result } = user;
      return AuthEntityMapper.fromUser(user);
    }
    if (customer) {
      const checkPassword = await compare(password, customer.password);
      if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = customer;
      return AuthEntityMapper.fromCustomer(customer);
    }
    throw new HttpException('USER_INVALID', 403);
  }

  private async issueTokens(entity: AuthEntity, client_id: string) {
    if (entity.type === 'user') {
      const userRoles = await this.rol_user.findOne(entity.id);
      if (!userRoles) {
        throw new NotFoundException('ROLES NO ENCONTRADOS');
      } else {
        const roles: RoleEnum[] = userRoles.map((role) => role.roleId);
        const payload: JwtPayload = {
          sub: entity.id,
          email: entity.email,
          name: entity.name,
          roles,
          type: 'user',
          scope: this.getUserScopes(roles),
          client_id,
        };
        return this.generateTokens(payload);
      }
    }

    const payload: JwtPayload = {
      sub: entity.id,
      type: 'customer',
      email: entity.email,
      name: entity.name,
      roles: [RoleEnum.CUSTOMER],
      scope: [Scope.CUSTOMER],
      client_id,
    };
    return this.generateTokens(payload);
  }

  private generateTokens(payload: JwtPayload) {
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    const expires_in = this.calculateExpiresIn(
      this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h'),
    );

    return { access_token, refresh_token, expires_in };
  }

  async login(user: LoginUserDto) {
    const { userpassword, useremail } = user;
    const userv = await this.validateUser(useremail, userpassword);
    const client_id = this.configService.getOrThrow<string>('OAUTH_CLIENT_ID');
    const tokens = await this.issueTokens(userv, client_id);
    return {
      ...tokens,
      token_type: 'bearer',
      user: {
        id: userv.id,
        email: userv.email,
        name: userv.name,
        type: userv.type,
      },
    };
  }

  getUserScopes(roles: RoleEnum[]): Scope[] {
    if (roles.includes(RoleEnum.ADMIN)) return [Scope.ADMIN];
    if (roles.includes(RoleEnum.MANAGER)) return [Scope.MANAGER];

    return [Scope.GUEST];
  }

  async oauth2Token(
    grant_type: string,
    username?: string,
    password?: string,
    refresh_token?: string,
    client_id?: string,
    client_secret?: string,
  ) {
    if (!client_id || !client_secret) {
      throw new UnauthorizedException('CLIENT_CREDENTIALS_REQUIRED');
    }
    const isValidClient = await this.validateClient(client_id, client_secret);
    if (!isValidClient) {
      throw new UnauthorizedException('INVALID_CLIENT_CREDENTIALS');
    }

    // 2️⃣ Resolver según grant_type
    switch (grant_type) {
      case 'password':
        if (!username || !password) {
          throw new UnauthorizedException('INVALID_CREDENTIALS');
        }
        return this.passwordGrant(username, password, client_id);

      case 'refresh_token':
        if (!refresh_token) {
          throw new UnauthorizedException('REFRESH_TOKEN_REQUIRED');
        }
        return this.refreshTokenGrant(refresh_token, client_id);

      case 'client_credentials':
        return this.handleClientCredentialsGrant(client_id);

      default:
        throw new UnauthorizedException('UNSUPPORTED_GRANT_TYPE');
    }
  }

  private async passwordGrant(
    username: string,
    password: string,
    client_id: string,
  ) {
    const entity = await this.validateUser(username, password);

    const { access_token, refresh_token, expires_in } = await this.issueTokens(
      entity,
      client_id,
    );

    let scope: string[] = [];

    if (entity.type === 'user') {
      const roles = await this.rol_user.findOne(entity.id);
      const roleEnums: RoleEnum[] = roles.map((r) => r.roleId);
      scope = this.getUserScopes(roleEnums);
    } else {
      scope = ['customer'];
    }

    return {
      access_token,
      refresh_token,
      token_type: 'bearer',
      expires_in,
      scope,
      user: {
        id: entity.id,
        email: entity.email,
        name: entity.name,
        type: entity.type,
      },
    };
  }

  private async refreshTokenGrant(refresh_token: string, client_id: string) {
    try {
      // Verificar refresh token (YA IMPLEMENTADO)
      const payload = await this.verifyRefreshToken(refresh_token);
      let entity: AuthEntity;

      if (payload.type === 'user') {
        const user = await this.usersService.finId(payload.sub);
        if (!user) {
          throw new UnauthorizedException('USER_NOT_FOUND');
        }
        entity = AuthEntityMapper.fromUser(user);
      } else if (payload.type === 'customer') {
        const customer = await this.customerService.findOne(payload.sub);
        if (!customer) {
          throw new UnauthorizedException('CUSTOMER_NOT_FOUND');
        }
        entity = AuthEntityMapper.fromCustomer(customer);
      } else {
        throw new UnauthorizedException('INVALID_TOKEN_TYPE');
      }

      const {
        access_token,
        refresh_token: new_refresh,
        expires_in,
      } = await this.issueTokens(entity, client_id);

      return {
        access_token,
        refresh_token: new_refresh,
        token_type: 'bearer',
        expires_in,
        scope: payload.scope,
      };
    } catch {
      throw new UnauthorizedException('INVALID_REFRESH_TOKEN');
    }
  }
  private handleClientCredentialsGrant(client_id: string) {
    const payload = {
      sub: client_id,
      client_id: client_id,
      grant_type: 'client_credentials',
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h'),
    });

    return {
      access_token,
      token_type: 'bearer',
      expires_in: 3600,
      scope: 'api',
    };
  }

  //  metodo   para  validar   otro metodo de  validar usuario  aun que   ya se valdia dentro de la  funcion  registrar

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
  private calculateExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/(\d+)([smhd])/);
    if (!match) return 3600;

    const [, amount, unit] = match;
    const amountNum = parseInt(amount, 10);

    switch (unit) {
      case 's':
        return amountNum;
      case 'm':
        return amountNum * 60;
      case 'h':
        return amountNum * 3600;
      case 'd':
        return amountNum * 86400;
      default:
        return 3600;
    }
  }

  public validateClient(
    client_id: string,
    client_secret: string,
  ): Promise<boolean> {
    const validClientId = this.configService.get<string>('OAUTH_CLIENT_ID');
    const validClientSecret = this.configService.get<string>(
      'OAUTH_CLIENT_SECRET',
    );

    return Promise.resolve(
      client_id === validClientId && client_secret === validClientSecret,
    );
  }

  private sanitizeUser(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userpassword, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  private async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.usersService.finId(payload.sub);
      if (!user) return null;

      const userRoles = await this.rol_user.findOne(user.userid);

      const roles: RoleEnum[] = userRoles.map((r) => r.roleId);

      return {
        ...this.sanitizeUser(user),
        roles: roles,
        client_id: payload.client_id,
        scope: payload.scope,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async validateUserByPayload(payload: JwtPayload) {
    const user = await this.usersService.finId(payload.sub);
    if (!user) return null;

    const userRoles = await this.rol_user.findOne(user.userid);
    const roles: RoleEnum[] = userRoles.map((role) => role.roleId);

    return {
      ...this.sanitizeUser(user),
      roles,
      client_id: payload.client_id,
      scope: payload.scope,
    };
  }
}
