import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../database/entities/task.entity';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

   async createTask( createTask:CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTask);
    return await this.taskRepository.save(task);
    }

    
  async findAllTask():Promise <Task[]> {
    return this.taskRepository.find({});
  }
  
  async findOneTask(id: number): Promise<Task> {
    const user = await this.taskRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `Task with ID ${id} deleted successfully` };
  }

  async updateTask(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
        throw new NotFoundException('Task not found');
    }
    task.status = 'COMPLETED';
    return this.taskRepository.save(task);
}


}
