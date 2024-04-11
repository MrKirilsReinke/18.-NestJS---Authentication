import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  subcomment: string;
}
