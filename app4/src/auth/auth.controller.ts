import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() data: { username: string, password: string }) {
        return this.authService.register(data.username, data.password)
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request) {
        return this.authService.login(req.user)
    }

}
