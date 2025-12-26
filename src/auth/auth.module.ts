import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { RefreshJwtStrategy } from './strategies/refreshToken';

import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';

import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { BearerStrategy } from './strategies/bearer-strategy';
import { ConfigModule } from '@nestjs/config';
import { LocalOAuthStrategy } from './strategies/oauth2.strategy';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/auth.guard';
import { OrdersDetailsModule } from 'src/orders-details/orders-details.module';
import { SizesModule } from 'src/sizes/sizes.module';
import { CustomersModule } from 'src/customers/customers.module';
import { OrdersModule } from 'src/orders/orders.module';
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
    forwardRef(() => CustomersModule),
    forwardRef(() => RolesModule),
    forwardRef(() => UsersModule),
    forwardRef(() => SizesModule),
    forwardRef(() => OrdersDetailsModule),
    forwardRef(() => OrdersModule),
  ],
  exports: [JwtAuthGuard, AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
