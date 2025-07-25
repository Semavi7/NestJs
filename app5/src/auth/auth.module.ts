import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async(configService:ConfigService)=>{
        const expiresIn = configService.get<string>('jwt.expiresIn')
        const secret = configService.get<string>('jwt.secret')
        return {
          secret,
          signOptions:{
            expiresIn
          }
        }
      },
      inject:[ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
