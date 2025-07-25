import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService:ConfigService){
        const secret: string | undefined = configService.get<string>('jwt.secret')
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: secret || 'my_secret_key'
        })
    }
    async validate(payload:any) {
        console.log('payload', payload)
        return {userId:payload.sub, username:payload.username}
    }
}