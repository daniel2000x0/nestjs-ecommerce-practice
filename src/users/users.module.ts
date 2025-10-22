import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRole } from 'src/users-roles/entities/users-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Gender } from 'src/genders/entities/gender.entity';

import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRole, Product, Gender])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
