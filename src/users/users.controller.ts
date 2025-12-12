import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Res,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAddDto } from './dto/rolesadd.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post('rolesAsignados')
  async assignRolesToUser(@Res() response, createUser: RolesAddDto) {
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
