import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from '../schema/todo.schema';
import { CreateTaskDto } from '../dto/create.task.dto';
import { UpdateTaskDto } from '../dto/update.task.dto';

@ApiTags('Tasks')
@Controller('todos')
export class TodoController {
  constructor(private readonly taskService: TodoService) {}

  // Create Task
  @Post()
  @ApiResponse({ type: Task, status: 201 })
  async create(@Body() body: CreateTaskDto): Promise<Task> {
    return await this.taskService.store(body);
  }

  // Get All Tasks
  @Get()
  @ApiResponse({ type: [Task], status: 200 })
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  // Get Task by ID
  @Get(':id')
  @ApiResponse({ type: Task, status: 200 })
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.taskService.findOne(id);
  }

  // Update Task
  @Patch(':id')
  @ApiResponse({ type: Task, status: 200 })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskService.update(id, body);
  }

  // Delete Task
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.taskService.delete(id);
  }
}
