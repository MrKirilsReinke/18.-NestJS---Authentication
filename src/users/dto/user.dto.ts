import { Expose, Type } from 'class-transformer';
import { CommentDto } from 'src/comments/dto/comment.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Type(() => CommentDto)
  @Expose()
  comments: CommentDto[];
}
