import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../libs/interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  // @Column()
  // assigned_events: string;
}
