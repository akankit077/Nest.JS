import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from 'src/middlewares/websocket.middleware';
import { WsAuthGuard } from 'src/ws-auth/ws-auth.guard';

@WebSocketGateway({ namespace: 'events' })
@UseGuards(WsAuthGuard)
export class SocketEventsGateway {
  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, room: string) {
    client.join(room);
    console.log(`Client ${client.id} joined room: ${room}`);
    // Send a confirmation message to the client
    client.emit('roomJoined', `You have successfully joined room: ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string) {
    client.leave(room);
    console.log(`Client ${client.id} left room: ${room}`);
    // Send a confirmation message to the client
    client.emit('roomLeft', `You have successfully left room: ${room}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    const { room, message } = JSON.parse(payload);
    console.log(payload);
    console.log(typeof payload);
    console.log(
      `Received message from client ${client.id} in room ${room}: ${message}`,
    );

    // Broadcast the message to all clients in the room, including the sender
    this.server.to(room).emit('message', { sender: client.id, message });
  }

  sendNotificationToAll(event: string, message: any) {
    this.server.emit(event, message);
  }
}
