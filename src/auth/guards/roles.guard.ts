import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleEnum } from 'common/enums/rol.enum';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const rolest = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!rolest || rolest.length === 0) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (user.role === RoleEnum.ADMIN) {
      return true;
    }

    return rolest.some((role) => user.roles.includes(role));
  }
}
