import { Inject, Injectable } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly ordersService: OrdersService
    ) {}
}
