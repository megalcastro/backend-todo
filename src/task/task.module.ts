import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/database/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
