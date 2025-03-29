import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IEvent } from '../libs/interfaces/event.interface';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/:id')
  public async getById(@Param('id') id: string): Promise<IEvent> {
    return this.eventService.getById(id);
  }

  @Post('/create')
  public async create(@Body() body: Omit<IEvent, 'id'>): Promise<IEvent> {
    return this.eventService.create(body);
  }

  @Put('/:id')
  public async updateById(
    @Param('id') id: string,
    @Body() body: Omit<IEvent, 'id'>,
  ): Promise<{ status: boolean }> {
    return this.eventService.updateById(id, body);
  }

  @Delete('/:id')
  public async deleteById(
    @Param('id') id: string,
  ): Promise<{ status: boolean }> {
    return this.eventService.deleteById(id);
  }
}
