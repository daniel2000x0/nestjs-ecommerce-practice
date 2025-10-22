import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'useremail', // 👈 campo del cuerpo JSON
      passwordField: 'userpassword', // 👈 campo del cuerpo JSON
    });
  }

  async validate(useremail: string, userpassword: string) {
    const user = await this.authService.validateUser(useremail, userpassword);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
