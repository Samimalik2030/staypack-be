import { Module } from '@nestjs/common';
import { TodoService } from './service/todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/todo.schema';
import { TodoController } from './controller/todo.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
