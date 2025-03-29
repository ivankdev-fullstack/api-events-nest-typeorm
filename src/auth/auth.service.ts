import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { AuthConfig } from '../config/auth.config';
import {
  AuthRegisterRequest,
  AuthRegisterResponse,
} from '../libs/contracts/auth/auth.register';
import { JWTPayload } from '../libs/interfaces/auth.interface';
import { UserService } from '../user/user.service';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async register(
    data: AuthRegisterRequest,
  ): Promise<AuthRegisterResponse> {
    const isExist = await this.userService.getByEmail(data.email);
    if (isExist) {
      throw new BadRequestException(
        'User with this email is already registered.',
      );
    }

    const hashedPass = await hashPassword(data.password);
    const user = await this.userService.create({
      ...data,
      password: hashedPass,
    });

    const token = this.jwtSign({ user_id: user.id });

    return { token };
  }

  private jwtSign(payload: JWTPayload): string {
    const { JWT_SECRET } = this.configService.get('auth') as AuthConfig;
    console.log({ JWT_SECRET });

    return jwt.sign(payload, JWT_SECRET, { algorithm: 'RS256' });
  }
}
