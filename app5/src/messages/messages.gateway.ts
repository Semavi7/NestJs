import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create.message.dto';

@WebSocketGateway({cors:true})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server:Server
  private connectedUsers:Map<string,string>=new Map()
  constructor(private jwtService:JwtService,
    private messageService:MessagesService
  ){}
  handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization?.split(' ')[1]
    if(!token){
      client.disconnect()
      return
    }
    const payload = this.jwtService.verify(token)
    const userId = payload.sub
    this.connectedUsers.set(userId, client.id)
    console.log('user connected', userId, client.id)

    this.server.emit('userStatus', {
      userId,
      status:'online'
    })
    } catch (error) {
      client.disconnect()
    }
  }
  handleDisconnect(client: Socket) {
    for(const [userId, socketId] of this.connectedUsers.entries()){
      if(socketId === client.id){
        this.connectedUsers.delete(userId)
        console.log('user disconnected', userId, client.id)
        this.server.emit('userStatus', {
          userId,
          status:'offline'
        })
        break
      }
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client:Socket,
    @MessageBody() data:{token:string, message:CreateMessageDto}
  ){
    try {
      const payload = this.jwtService.verify(data.token)
      const userId = payload.sub
      const message = await this.messageService.create(userId, data.message)
      const reciverSocketId = this.connectedUsers.get(data.message.to)
      if(reciverSocketId){
        this.server.to(reciverSocketId).emit('newMessage', {
          message,
          from:userId
        })
      }
      return{success:true, message}
    } catch (error) {
      return{success:false, error:error.message}
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data:{token:string, to:string, isTyping:boolean}
  ){
    try {
      const payload = this.jwtService.verify(data.token)
      const userId = payload.sub
      const receiverSocketId = this.connectedUsers.get(data.to)
      if(receiverSocketId){
        this.server.to(receiverSocketId).emit('userTyping',{
          userId,
          isTyping: data.isTyping
        })
      }
    } catch (error) {
      console.error('error', error)
    }
  }
}
