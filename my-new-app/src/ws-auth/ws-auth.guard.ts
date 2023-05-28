import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { jwtConstants } from 'src/auth/auth.constants';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();
    WsAuthGuard.validateToken(client);

    return true;
  }

  static validateToken(client: Socket) {
    const { authorization } = client.handshake.headers;
    console.log({ authorization });
    const token: string = authorization.split(' ')[1];
    const payload = verify(token, jwtConstants.secret);
    return payload;
  }
}
