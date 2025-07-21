import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(){
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.userService.findOne(id)
    }

    @Post()
    create(@Body() data:{username:string, password:string}){
        return this.userService.create(data.username, data.password)
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() data:{password:string}){
        return this.userService.update(id, data.password)
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.userService.remove(id)
    }

    @Patch(':userId/assign-role/:roleId')
  assignRoleToUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.userService.assingRole(userId, roleId);
  }
}
