import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ValidationPipe,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async registerUser(
    @Res() response,
    @Body(new ValidationPipe()) createUser: CreateUserDto,
  ) {
    try {
      const newUser = await this.usersService.create(createUser); // <- await
      return response.status(201).json({
        message: 'Usuario creado correctamente',
        user: newUser.user,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        return response.status(HttpStatus.CONFLICT).json({
          message: error.message,
          statusCode: 409,
        });
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error en el servidor',
        error: error.message,
        statusCode: 500,
      });
    }
  }

  @Get('login')
  async loginUser(@Body() login: LoginUserDto) {
    return await this.usersService.login(login);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
