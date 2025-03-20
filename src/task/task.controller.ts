import { Body, Controller, Get, Post,Patch, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';



@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    async getTasks() {
        return this.taskService.findAllTask();
    }

    @Post()
    async createTask(@Body() request : CreateTaskDto) {
        return this.taskService.createTask(request);
    }

    @Put(':id')
    async updateTask(@Param('id') id: number) {
    return this.taskService.updateTask(id);

}

    @Delete(':id')
    async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
    }
}

