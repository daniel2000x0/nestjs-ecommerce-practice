import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRole } from 'src/users-roles/entities/users-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Gender } from 'src/genders/entities/gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRole, Product, Gender])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
