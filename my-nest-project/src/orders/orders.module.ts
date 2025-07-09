import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(()=>UsersModule)],
  exports: [OrdersService],
  providers: [OrdersService]
})
export class OrdersModule {}
