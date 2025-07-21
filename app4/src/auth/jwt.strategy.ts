import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private jwtServices:JwtService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'my_secret_key'
        })
    }
    validate(payload: any) {
        console.log('payload', payload)
        return {
            id:payload.sub,
            username:payload.username,
            roles:payload.roles,
            permissions:payload.permissions
        }
    }

}