import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create.user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post()
    @UsePipes(new ValidationPipe({whitelist:true}))
    create(@Body() createUserDto:CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Get()
    get(){
        return this.userService.findAll()
    }

    @Get(':id')
    getById(@Param('id',ParseIntPipe) id:number){
        return this.userService.findOne(id)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number){
        this.userService.remove(id)
        return {message: 'Kullanıcı Silindi'}
    }
}
