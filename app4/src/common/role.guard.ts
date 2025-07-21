import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "./roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if(!requireRoles || requireRoles.length===0){
            return true
        }

        const {user} = context.switchToHttp().getRequest()

        return requireRoles.some((role)=>user?.roles?.includes(role))
    }
    
}