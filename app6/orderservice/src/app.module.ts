import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order/order.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect:'postgres',
      host:'localhost',
      port:5432,
      pool:{
        max:10,
        min:2,
        maxUses:6
      },
      username:'postgres',
      password:'Burchan926',
      database:'datadb',
      models:[Order],
      synchronize:true,
      autoLoadModels:true,
      logging: true,
      retryAttempts:6 
    }),
    OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
