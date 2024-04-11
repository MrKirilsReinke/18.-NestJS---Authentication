import { Expose, Type } from 'class-transformer';
import { CommentDto } from 'src/comments/dto/comment.dto';

export class UserDto {
  @Expose({ name: 'id' })
  id: number;

  @Expose({ name: 'email' })
  email: string;

  @Type(() => CommentDto)
  @Expose({ name: 'comments' })
  comments: CommentDto[];
}
