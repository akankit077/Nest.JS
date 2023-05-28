import { Module } from '@nestjs/common';
import { SocketEventsGateway } from './socket_events.gateway';

@Module({
  providers: [SocketEventsGateway],
  exports: [SocketEventsGateway],
})
export class SocketEventsModule {}
