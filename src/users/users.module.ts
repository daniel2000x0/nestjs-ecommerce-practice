import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRole } from 'src/users-roles/entities/users-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstanst } from 'src/jwt/jwt.constants';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UsersRole, Product, Gender]),
    JwtModule.register({
      secret: jwtConstanst.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
