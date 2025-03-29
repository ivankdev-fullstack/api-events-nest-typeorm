import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IUser } from '../../libs/interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryColumn({ type: 'uuid' })
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
