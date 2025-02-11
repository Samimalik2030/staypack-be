import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schema/todo.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create.task.dto';
import { UpdateTaskDto } from '../dto/update.task.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  // Create Task
  async store(data: CreateTaskDto): Promise<Task> {
    return await this.taskModel.create(data);
  }

  // Get All Tasks
  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  // Get Task by ID
  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  // Update Task
  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  // Delete Task
  async delete(id: string): Promise<void> {
    const task = await this.taskModel.findByIdAndDelete(id).exec();
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
  }
}
