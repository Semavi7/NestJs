import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create.message.dto';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>){}

    async create(userId:string, createMessageDto:CreateMessageDto){
        const newMessage = new this.messageModel({
            content: createMessageDto.content,
            to: createMessageDto.to,
            from: userId
        })
        return newMessage.save()
    }

    async getConversation(userId:string, otherUserId:string){
        return this.messageModel.find({
            $or:[
                {from:userId, to:otherUserId},
                {from:otherUserId, to:userId}
            ]
        })
        .sort()
        .populate('from','username')
        .populate('to','username')
        .exec()
    }

    async markAsRead(userId:string, otherUserId:string){
        await this.messageModel.updateMany(
            {from:otherUserId, to:userId, read:false},
            {$set:{read:true}}
        ).exec()
    }
}
