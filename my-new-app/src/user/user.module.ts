import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { SocketEventsModule } from 'src/socket_events/socket_events.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), SocketEventsModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
