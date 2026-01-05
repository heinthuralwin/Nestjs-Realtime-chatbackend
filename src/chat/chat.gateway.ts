import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { UseGuards } from "@nestjs/common";
import { WsJwtGuard } from "src/auth/guards/ws-jwt.guarde";
import { Socket } from "socket.io";


@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(private chatService: ChatService) { }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join-room')
  async joinRoom(
    @MessageBody() roomId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join('room-${roomId}');
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() data: { roomId: number; content: string },
    @ConnectedSocket() client: any,
  ) {
    const message = await this.chatService.createMessage({
      roomId: data.roomId,
      content: data.content,
      userId: client.user.sub,
    });

    client.to('room-${data.roomId}').emit('new-message', message);
    return message;
  }
}
