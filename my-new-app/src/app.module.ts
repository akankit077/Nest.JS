import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import databaseConfig from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { CacheModule, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { SocketEventsModule } from './socket_events/socket_events.module';
import { WsAuthModule } from './ws-auth/ws-auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({ ...databaseConfig, models: [User] }),
    CacheModule.register({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store: async () =>
        await redisStore({
          // Store-specific configuration:
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
          ttl: 5,
        }),
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    SocketEventsModule,
    WsAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
