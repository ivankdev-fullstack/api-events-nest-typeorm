import { Body, Controller, Post } from '@nestjs/common';
import {
  AuthLoginRequest,
  AuthLoginResponse,
} from '../libs/contracts/auth/auth.login';
import {
  AuthRegisterRequest,
  AuthRegisterResponse,
} from '../libs/contracts/auth/auth.register';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() body: AuthLoginRequest,
  ): Promise<AuthLoginResponse> {
    return this.authService.login(body);
  }

  @Post('register')
  public async register(
    @Body() body: AuthRegisterRequest,
  ): Promise<AuthRegisterResponse> {
    return this.authService.register(body);
  }
}
