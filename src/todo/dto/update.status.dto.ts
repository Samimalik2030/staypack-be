import { ApiProperty } from "@nestjs/swagger";
import { UpdateTaskDto } from "./update.task.dto";
import { TaskStatus } from "../types";
import { IsEnum } from "class-validator";

export class UpdateStatusDTO{
@ApiProperty({enum:TaskStatus})
@IsEnum(TaskStatus)
status:TaskStatus
}