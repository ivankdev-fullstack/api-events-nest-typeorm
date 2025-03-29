import { IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEvent } from '../../libs/interfaces/event.interface';

@Entity('events')
export class Event implements IEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('varchar', { length: 1000 })
  description: string;

  @IsOptional()
  @Column('date', { default: new Date() })
  due_date: Date;
}
