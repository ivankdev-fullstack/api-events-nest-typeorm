import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { authConfig } from '../config/auth.config';
import {
  AuthLoginRequest,
  AuthLoginResponse,
} from '../libs/contracts/auth/auth.login';
import {
  AuthRegisterRequest,
  AuthRegisterResponse,
} from '../libs/contracts/auth/auth.register';
import { JWTPayload } from '../libs/interfaces/auth.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfigStore: ConfigType<typeof authConfig>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(data: AuthLoginRequest): Promise<AuthLoginResponse> {
    const isExist = await this.userService.getByEmail(data.email);
    if (!isExist) {
      throw new NotFoundException('User with this email not found.');
    }

    const isValidPassword = await this.verifyPassword(
      data.password,
      isExist.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Email or password are incorrect.');
    }

    const token = await this.jwtSign({ user_id: isExist.id });
    return { token };
  }

  public async register(
    data: AuthRegisterRequest,
  ): Promise<AuthRegisterResponse> {
    const isExist = await this.userService.getByEmail(data.email);
    if (isExist) {
      throw new BadRequestException(
        'User with this email is already registered.',
      );
    }

    const hashedPass = await this.hashPassword(data.password);
    const user = await this.userService.create({
      ...data,
      password: hashedPass,
    });

    const token = await this.jwtSign({ user_id: user.id });
    return { token };
  }

  private jwtSign(payload: JWTPayload): Promise<string> {
    const secretKey = this.authConfigStore.jwt.secret;
    return this.jwtService.signAsync(payload, { secret: secretKey });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async verifyPassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
