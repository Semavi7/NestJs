import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
