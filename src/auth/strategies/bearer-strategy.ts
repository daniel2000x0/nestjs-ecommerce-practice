import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: any, payload: any) {
    //try {
    ///  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    // const payloadv = await this.authService.validateUserByPayload(payload);
    // Verificar token con el servicio
    // const user = await this.authService.validateToken(token);
    // if (!user) {
    //   throw new UnauthorizedException('Invalid token');
    // }
    // if (!payloadv) {
    //  throw new UnauthorizedException('User not found');
    // }
    // return {
    // ...user,
    ////  token: token,
    //  };
    ///} catch (error) {
    //  console.log(error);
    //  throw new UnauthorizedException('Authentication failed');
    // }
    const user = await this.authService.validateUserByPayload(payload);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      ...user,
      token: ExtractJwt.fromAuthHeaderAsBearerToken()(request),
    };
  }
}
