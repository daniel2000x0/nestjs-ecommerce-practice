import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { RefreshJwtStrategy } from './strategies/refreshToken';

import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { CustomerModule } from '../customer/customer.module';

import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { BearerStrategy } from './strategies/bearer-strategy';
import { ConfigModule } from '@nestjs/config';
import { LocalOAuthStrategy } from './strategies/oauth2.strategy';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/auth.guard';
@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    LocalOAuthStrategy,
    BearerStrategy,
    RolesGuard,
    JwtAuthGuard,
  ],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    CustomerModule,
    UsersModule,
    forwardRef(() => RolesModule),
  ],
  exports: [
    JwtAuthGuard, // ✅ CLAVE
    AuthService,
    JwtModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
