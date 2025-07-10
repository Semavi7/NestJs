import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { OrdersModule } from 'src/orders/orders.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [forwardRef(()=>OrdersModule), ConfigModule.forRoot("dev")],
  exports:[UsersService],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
