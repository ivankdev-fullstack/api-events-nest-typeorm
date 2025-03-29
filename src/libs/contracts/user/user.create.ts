import { IsEmail, IsString } from 'class-validator';
import { IUser } from '../../interfaces/user.interface';

export class UserCreateRequest implements Omit<IUser, 'id'> {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UserCreateResponse {
  @IsString()
  id: string;
}
