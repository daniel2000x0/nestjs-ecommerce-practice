import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesAddDto } from './dto/rolesadd.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'common/enums/rol.enum';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @Roles(RoleEnum.ADMIN)
  find() {
    return this.usersService.findAll();
  }
  @Roles(RoleEnum.ADMIN)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @Roles(RoleEnum.ADMIN)
  @Post('rolesAsignados')
  async assignRolesToUser(@Body() response, createUser: RolesAddDto) {
    try {
      const newUser = await this.usersService.roles(createUser); // <- await
      return response.status(201).json({
        message: 'Roles asignados correctamente',
        user: newUser.save,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: 'Error en el servidor',
        error: error.message,
        statusCode: 500,
      });
    }
  }
}
