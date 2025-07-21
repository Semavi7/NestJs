import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { map } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtServicce: JwtService
    ) { }

    async validateUser(username: string, pass: string) {
        const user = await this.userService.findOneByUserName(username, ['userRoles', 'userRoles.role','userRoles.role.permissions'])
        console.log('user', user)
        if (!user) {
            return null
        }
        const compaore = await bcrypt.compare(pass, user.password)
        if (!compaore) {
            return null
        }
        const roles = user.userRoles?.map((ur) => ur.role?.name) ?? [];
        const permissions = user.userRoles.flatMap(
            (ur) => ur?.role?.permissions.map((p) => p.name) || [],
        )
        return {
            id: user.id,
            username: user.username,
            roles,
            permissions,
        }
    }

    async register(username: string, password: string) {
        const newUser = await this.userService.create(username, password)
        return newUser
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id, roles: user.roles, permissions:user.permissions }
        return {
            access_token: this.jwtServicce.sign(payload)
        }
    }
}
