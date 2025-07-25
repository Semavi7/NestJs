import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessagesGateway } from './messages.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const secret = configService.get<string>('jwt.secret');
      return {
        secret,
      };
    },
    inject: [ConfigService],
  }),],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway]
})
export class MessagesModule { }
