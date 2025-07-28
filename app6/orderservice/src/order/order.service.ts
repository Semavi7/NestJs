import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order) private orderModel: typeof Order
    ){}

    create(order: any){
        return this.orderModel.create(order)
    }

    get(){
        return this.orderModel.findAll({})
    }

    getOrderByUserId(userId:string){
        return this.orderModel.findAll({where:{userId:userId}})
    }
}
