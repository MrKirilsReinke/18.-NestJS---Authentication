import { Expose, Type } from 'class-transformer';
// import { Comment } from 'src/comments/entities/comment.entity';
import { CommentDto } from 'src/comments/dto/comment.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Type(() => CommentDto)
  // @Transform(({obj}) => obj.comment)
  @Expose()
  comments: CommentDto[];
}
