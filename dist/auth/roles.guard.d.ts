import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RolesGuard implements CanActivate {
    private allowedRoles;
    constructor(allowedRoles: string[]);
    canActivate(context: ExecutionContext): boolean;
}
