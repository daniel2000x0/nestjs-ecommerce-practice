import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleEnum } from 'common/enums/rol.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/auth.guard';

export const OAUTH_ROLES_KEY = 'oauth-roles';
export const IS_PUBLIC_KEY = 'isPublic';
export const OAUTH_SCOPES_KEY = 'oauth-scopes';
// Decorador para roles OAuth2
export const OAuthRoles = (...roles: RoleEnum[]) =>
  SetMetadata(OAUTH_ROLES_KEY, roles);

// Decorador para endpoints públicos
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const OAuthScopes = (...scopes: string[]) =>
  SetMetadata(OAUTH_SCOPES_KEY, scopes);

// Decorador principal para autenticación OAuth2
export function OAuthAuth(roles?: RoleEnum[]) {
  if (roles && roles.length > 0) {
    return applyDecorators(
      OAuthRoles(...roles),
      UseGuards(JwtAuthGuard, RolesGuard),
    );
  }

  return applyDecorators(UseGuards(JwtAuthGuard));
}

export function Auth(role: RoleEnum[]) {
  return applyDecorators(Roles(...role), UseGuards(JwtAuthGuard, RolesGuard));
}
