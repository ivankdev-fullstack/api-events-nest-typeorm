import { Test, TestingModule } from '@nestjs/testing';
import { IEvent } from '../libs/interfaces/event.interface';
import { EventController } from './event.controller';
import { EventService } from './event.service';

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  const mockEvent: IEvent = {
    id: '1',
    name: 'Test Event',
    description: 'Test Location',
    due_date: new Date(),
  };

  const mockEventService = {
    getById: jest.fn().mockResolvedValue(mockEvent),
    create: jest.fn().mockResolvedValue(mockEvent),
    updateById: jest.fn().mockResolvedValue({ status: true }),
    deleteById: jest.fn().mockResolvedValue({ status: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: mockEventService,
        },
      ],
    }).compile();

    eventController = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(eventController).not.toBeDefined();
  });

  it('should return an event by ID', async () => {
    await expect(eventController.getById('1')).resolves.toEqual(mockEvent);
    expect(eventService.getById).toHaveBeenCalledWith('1');
  });

  it('should create an event', async () => {
    const eventData = {
      name: 'Test Event',
      description: 'Test Location',
      due_date: new Date(),
    };
    await expect(eventController.create(eventData)).resolves.toEqual(mockEvent);
    expect(eventService.create).toHaveBeenCalledWith(eventData);
  });

  it('should update an event by ID', async () => {
    const updateData = {
      name: 'Updated Event',
      description: 'Test Location',
      due_date: new Date(),
    };
    await expect(eventController.updateById('1', updateData)).resolves.toEqual({
      status: true,
    });
    expect(eventService.updateById).toHaveBeenCalledWith('1', updateData);
  });

  it('should delete an event by ID', async () => {
    await expect(eventController.deleteById('1')).resolves.toEqual({
      status: true,
    });
    expect(eventService.deleteById).toHaveBeenCalledWith('1');
  });
});
