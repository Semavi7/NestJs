import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('user')
  createUser(@Body() data:{username:string}){
    return this.appService.createUser(data)
  }

  @Get('user/:id')
  getUserById(@Param('id') id:string){
    return this.appService.getUserById(id)
  }

  @Post('order')
  createOrder(@Body() data:{userId:string,item:string}){
    return this.appService.createOrderByUserId(data)
  }

  @Get('order')
  getOrders(){
    return this.appService.getOrders()
  }

  @Get('order/:userId')
  getOrdersByUserId(@Param('userId') id:string){
    return this.appService.getOrdersByUserId(id)
  }
}
