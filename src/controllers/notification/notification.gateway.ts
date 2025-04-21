import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Types } from 'mongoose';
import { SendNotificationDto } from '@/definitions/dtos/notification';
import { SocketEvents } from '@/definitions/enum';

@WebSocketGateway({
  cors: '*',
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: any) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(userId);
      console.log('Client connected:', client.id, 'User ID:', userId);
    }
  }

  handleDisconnect(client: any) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.leave(userId);
      console.log('Client disconnected:', client.id, 'User ID:', userId);
    }
  }

  async notifyUser(userId: Types.ObjectId, data: SendNotificationDto) {
    const notification = this.server.to(userId.toString()).emit(SocketEvents.NOTIFICATION, data);
    console.log('nnnnnnnnnnnnnnnn', notification);
    return notification;
  }
}
