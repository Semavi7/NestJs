import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @MessagePattern('create_user')
    create(data:{username:string}){
        return this.userService.create(data)
    }

    @MessagePattern('get_user_by_id')
    getById(id:string){
        return this.userService.findById(id)
    }
}
