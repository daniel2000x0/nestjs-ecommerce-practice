import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { RefreshJwtStrategy } from './strategies/refreshToken';

import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { CustomerModule } from './customer/customer.module';

import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    //UsersService,
    //RolesService,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    CustomerModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
