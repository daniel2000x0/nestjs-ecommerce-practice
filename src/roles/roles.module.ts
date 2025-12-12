import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRole } from 'src/users-roles/entities/users-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRole])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
