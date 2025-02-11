import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { MongoFactory } from 'src/app/decorators/mongo-factory';
import { MongoSchema } from 'src/app/decorators/mongo.schema';
import { BaseSchema } from 'src/app/decorators/base.schema';
import {
  TaskCategory,
  TaskPriority,
  TaskRecurrence,
  TaskStatus,
} from '../types';

@MongoSchema()
export class Task extends BaseSchema {
  public readonly etype = 'User';

  @ApiProperty({ description: 'Title of the task' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    required: false,
  })
  @Prop()
  description?: string;

  @Prop({ default: TaskStatus.PENDING, enum: TaskStatus })
  status: TaskStatus;

  @Prop({ default: TaskPriority.MEDIUM, enum: TaskPriority })
  priority: TaskPriority;

  @Prop({ type: String, enum: TaskRecurrence, default: null })
  recurrenceType?: TaskRecurrence;

  @ApiProperty({ description: 'Deadline for the task', required: false })
  @Prop({ type: Date })
  dueDate?: Date;

  @ApiProperty({ description: 'Start date of the task', required: false })
  @Prop({ type: Date })
  startDate?: Date;

  @ApiProperty({
    description: 'Completion timestamp of the task',
    required: false,
  })
  @Prop({ type: Date })
  completedAt?: Date;

  @ApiProperty({ description: 'Whether the task is recurring', default: false })
  @Prop({ default: false })
  isRecurring: boolean;

  @ApiProperty({
    description: 'Category of the task',
    enum: TaskCategory,
    required: false,
  })
  @Prop({ default: TaskCategory.OTHER, enum: TaskCategory })
  category: TaskCategory;

  @ApiProperty({
    description: 'Additional notes for the task',
    required: false,
  })
  @Prop({ default: '' })
  notes?: string;
}

export const TaskSchema = MongoFactory.createSchema(Task);
