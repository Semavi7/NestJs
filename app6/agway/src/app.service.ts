import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private orderServiceClient:ClientProxy
  private userServiceClient:ClientProxy
  constructor(){
    this.orderServiceClient = ClientProxyFactory.create({
      transport:Transport.TCP,
      options:{
        host:'localhost',
        port:3002
      }
    })

    this.userServiceClient = ClientProxyFactory.create({
      transport:Transport.TCP,
      options:{
        host:'localhost',
        port:3001
      }
    })
  }

  createUser(data:{username:string}){
    return this.userServiceClient.send('create_user',data)
  }

  getUserById(id:string){
    return this.userServiceClient.send('get_user_by_id',id)
  }

  createOrderByUserId(data:{userId:string,item:string}){
    return this.orderServiceClient.send('create_order',data)
  }

  getOrders(){
    return this.orderServiceClient.send('get_orders',{})
  }

  getOrdersByUserId(id:string){
    return this.orderServiceClient.send('get_order_by_user_id',id)
  }
}
