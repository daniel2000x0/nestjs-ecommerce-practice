import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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
    if (!user || !user.roles) {
      throw new ForbiddenException('User authentication required');
    }
    /*const arraroles = user.roles?.map((r) => r.roleid) || [];
    console.log(arraroles);
    const roles = rolest.some((roler) => arraroles.includes(roler));
    if (user.role === RoleEnum.ADMIN) {
      return true;
    }
    if (!roles) {
      throw new ForbiddenException('ACCESO DENEGADO');
    }*/
    const userRoles: RoleEnum[] = this.extractRoleIds(user.roles);

    const hasRole = rolest.some(
      (role) => userRoles.includes(role), // ✅ SIN ERROR
    );
    if (!hasRole) {
      throw new ForbiddenException('ACCESO DENEGADO');
    }
    return true;
  }
  //metodo  extraer  roles opcion
  private extractRoleIds(roles: any[]): any[] {
    return roles.map((role) => {
      if (typeof role === 'object') {
        return role.roleid || role.id || role.name;
      }
      return role;
    });
  }
}
