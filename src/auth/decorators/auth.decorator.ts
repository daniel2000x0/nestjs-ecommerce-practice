import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleEnum } from 'common/enums/rol.enum';
import { Roles } from './roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(role: RoleEnum[]) {
  return applyDecorators(Roles(...role), UseGuards(JwtGuard, RolesGuard));
}
