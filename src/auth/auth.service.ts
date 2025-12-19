import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => RolesService))
    private readonly rol_user: RolesService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneWithUserName(username);
    if (!user) throw new HttpException('USER_NOT_FOUND', 404);
    const checkPassword = await compare(password, user.userpassword);
    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userpassword: _, ...result } = user;
    return result;
  }
  private async issueTokens(user: any, client_id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const userRoles = await this.rol_user.findOne(user.userid);
    //const userRoles = await this.rol_user.findOne(user.userid);
    if (!userRoles) throw new HttpException('USER_NOT_FOUND', 404);
    //  const roles = userRoles.map((r) => r.roleid);
    const roles = userRoles.map((role) => role.roleid);

    const payload = {
      sub: user.userid,
      email: user.useremail,
      name: user.userfirstname,
      roles,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      scope: this.getUserScopes(roles),
      client_id,
    };

    return this.generateTokens(payload);
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
      this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h'),
    );

    return { access_token, refresh_token, expires_in };
  }

  async login(user: LoginUserDto) {
    const { userpassword, useremail } = user;
    const userv = await this.validateUser(useremail, userpassword);
    const client_id = await this.configService.get('OAUTH_CLIENT_ID');
    const tokens = await this.issueTokens(userv, client_id);
    return {
      ...tokens,
      token_type: 'bearer',
      user: {
        id: userv.userid,
        email: userv.useremail,
        name: userv.userfirstname,
      },
    };

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
  }

  private getUserScopes(roles: string[]): string {
    if (roles.includes('ADMIN')) return 'admin';
    if (roles.includes('USER')) return 'user';
    return 'guest';
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

  private async refreshTokenGrant(refresh_token: string, client_id: string) {
    try {
      // Verificar refresh token (YA IMPLEMENTADO)
      const payload = await this.verifyRefreshToken(refresh_token);

      // Buscar usuario
      const user = await this.usersService.finId(payload.sub);
      if (!user) {
        throw new UnauthorizedException('USER_NOT_FOUND');
      }

      // Emitir nuevos tokens
      const {
        access_token,
        refresh_token: new_refresh,
        expires_in,
      } = await this.issueTokens(user, client_id);

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
  //}

  private handleClientCredentialsGrant(client_id: string) {
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

  public validateClient(
    client_id: string,
    client_secret: string,
  ): Promise<boolean> {
    const validClientId = this.configService.get('OAUTH_CLIENT_ID');
    const validClientSecret = this.configService.get('OAUTH_CLIENT_SECRET');

    return Promise.resolve(
      client_id === validClientId && client_secret === validClientSecret,
    );
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

      const user = await this.usersService.finId(payload.sub);
      if (!user) return null;

      const userRoles = await this.rol_user.findOne(user.userid);
      const roles = userRoles.map((role) => role.roleid);

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

  async validateUserByPayload(payload: any): Promise<any> {
    const user = await this.usersService.finId(payload.sub);
    if (!user) return null;

    const userRoles = await this.rol_user.findOne(user.userid);
    const roles = userRoles.map((role) => role.roleid);

    return {
      ...this.sanitizeUser(user),
      roles,
      client_id: payload.client_id,
      scope: payload.scope,
    };
  }
}
