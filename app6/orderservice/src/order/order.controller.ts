import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
    constructor(private orderService:OrderService){}

    @MessagePattern('create_order')
    create(data:{userId:string,item:string}){
        return this.orderService.create(data)
    }

    @MessagePattern('get_orders')
    getOrders(){
        return this.orderService.get()
    }

    @MessagePattern('get_order_by_user_id')
    getOrderByUserId(id:string){
        return this.orderService.getOrderByUserId(id)
    }


}
