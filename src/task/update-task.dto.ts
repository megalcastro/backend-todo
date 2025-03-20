import { IsString, IsEmpty } from 'class-validator';

export class UpdateTaskDto {

  @IsString()
  @IsEmpty()
  title?: string;

  @IsString()
  @IsEmpty()
  description?: string;
}
