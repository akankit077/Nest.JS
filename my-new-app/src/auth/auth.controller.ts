import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  // TODO: Use loginDto instead of any
  login(@Request() req: any) {
    // TODO: Send User details along with the token
    return this.authService.login(req.user);
  }
}
