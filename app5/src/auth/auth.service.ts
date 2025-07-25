import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService
    ){}

    async validateUser(username:string, password:string){
        try {
            console.log(`Validate user attempt for: ${username}`)
            const user = await this.userService.findOne(username)
            if(!user){
                console.log(`User not found: ${username}`)
                return null
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            console.log(`Is password valid: ${isPasswordValid}`)
            if(isPasswordValid){
                const { password, ...result } = user.toObject()
                return result
            }
            return null
        } catch (error) {
            console.error("Error in validateUser:", error);
            return null
        }
    }

    async login(login:LoginDto){
        const user = await this.validateUser(login.username, login.password)
        if(!user){
            throw new UnauthorizedException('Invalid credential')
        }
        const payload = { username: user.username, sub: user._id}
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                username: user.username
            }
        }
    }

    async register(register:RegisterDto){
        const user = await this.userService.create(register)
        const { password, ...result } = user.toObject()
        const payload = { username: user.username, sub: user._id}
        return {
            access_token: this.jwtService.sign(payload),
            user:result
        }
    }
}
