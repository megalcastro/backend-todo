import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { Repository } from 'typeorm';
import { Task } from '../database/entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<Task>;

  const mockTaskRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((task) => Promise.resolve({ id: 1, ...task })),
    find: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Task', description: 'Test Desc', status: 'PENDING' }]),
    findOne: jest.fn().mockImplementation(({ where }) => {
      return where.id === 1
        ? Promise.resolve({ id: 1, title: 'Test Task', description: 'Test Desc', status: 'PENDING' })
        : Promise.resolve(null);
    }),
    delete: jest.fn().mockImplementation((id) => {
      return Promise.resolve({ affected: id === 1 ? 1 : 0 });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('Debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('Debe crear una tarea', async () => {
    const createTaskDto = { title: 'Nueva tarea', description: 'Descripción de prueba' };
    const result = await service.createTask(createTaskDto);
    expect(result).toEqual({ id: 1, ...createTaskDto });
    expect(repository.create).toHaveBeenCalledWith(createTaskDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('Debe retornar todas las tareas', async () => {
    const tasks = await service.findAllTask();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test Task');
    expect(repository.find).toHaveBeenCalled();
  });

  it('Debe encontrar una tarea por ID', async () => {
    const task = await service.findOneTask(1);
    expect(task).toEqual({ id: 1, title: 'Test Task', description: 'Test Desc', status: 'PENDING' });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('Debe lanzar un error si la tarea no existe', async () => {
    await expect(service.findOneTask(999)).rejects.toThrow(NotFoundException);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  it('Debe eliminar una tarea si existe', async () => {
    const result = await service.deleteTask(1);
    expect(result).toEqual({ message: 'Task with ID 1 deleted successfully' });
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('Debe lanzar un error al eliminar una tarea inexistente', async () => {
    await expect(service.deleteTask(999)).rejects.toThrow(NotFoundException);
    expect(repository.delete).toHaveBeenCalledWith(999);
  });

  // it('Debe actualizar el estado de una tarea a COMPLETED', async () => {
  //   jest.spyOn(repository, 'save').mockImplementation((task) => Promise.resolve({ ...task, status: 'COMPLETED' }));
  //   const result = await service.updateTask(1);
  //   expect(result.status).toBe('COMPLETED');
  //   expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  //   expect(repository.save).toHaveBeenCalled();
  // });

  it('Debe lanzar un error al actualizar una tarea inexistente', async () => {
    await expect(service.updateTask(999)).rejects.toThrow(NotFoundException);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
  });
});
