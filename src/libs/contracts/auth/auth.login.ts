import { IsEmail, IsString } from 'class-validator';
import { IUser } from '../../interfaces/user.interface';

export class AuthLoginRequest implements Pick<IUser, 'email' | 'password'> {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class AuthLoginResponse {
  @IsString()
  token: string;
}
