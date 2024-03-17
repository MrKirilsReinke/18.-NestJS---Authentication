import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  comment: string;

  @Expose()
  text: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Expose()
  approved: boolean;
}
