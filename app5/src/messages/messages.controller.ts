import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.auth.guard';
import { MessagesService } from './messages.service';

@Controller('messages')
@UseGuards(JwtGuard)
export class MessagesController {
    constructor(private messageService: MessagesService){}

    @Get('conversation/:userId')
    async getConversation(@Request() req, @Param('userId') otherUserId:string){
        console.log(req.user)
        await this.messageService.markAsRead(req?.user?.userId,otherUserId)
        return this.messageService.getConversation(req?.user?.userId,otherUserId)
    }
}
