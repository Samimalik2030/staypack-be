import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { TaskPriority, TaskRecurrence, TaskCategory } from '../types';

export class UpdateTaskDto {
  @ApiProperty({ description: 'Title of the task', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Priority level of the task',
    enum: TaskPriority,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiProperty({ description: 'Deadline for the task', required: false })
  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @ApiProperty({ description: 'Start date of the task', required: false })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description: 'Whether the task is recurring',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @ApiProperty({
    description: 'Recurrence type for the task',
    enum: TaskRecurrence,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskRecurrence)
  recurrenceType?: TaskRecurrence;

  @ApiProperty({
    description: 'Category of the task',
    enum: TaskCategory,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskCategory)
  category?: TaskCategory;

  @ApiProperty({
    description: 'Additional notes for the task',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
