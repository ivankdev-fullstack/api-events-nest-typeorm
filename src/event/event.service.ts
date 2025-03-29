import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEvent } from '../libs/interfaces/event.interface';
import { Event } from './entity/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  public async getById(id: string): Promise<IEvent> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException('Event not found.');
    }
    return event;
  }

  public async create(data: Omit<IEvent, 'id'>): Promise<IEvent> {
    return this.eventRepository.save(data);
  }

  public async updateById(
    id: string,
    data: Omit<IEvent, 'id'>,
  ): Promise<{ status: boolean }> {
    const result = await this.eventRepository.update({ id }, data);
    return { status: (result?.affected || 0) > 0 };
  }

  public async deleteById(id: string): Promise<{ status: boolean }> {
    const result = await this.eventRepository.delete({ id });
    return { status: (result?.affected || 0) > 0 };
  }
}
