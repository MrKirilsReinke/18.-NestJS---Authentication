import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose({ name: 'id' })
  id: number;

  @Expose({ name: 'comment' })
  comment: string;

  @Expose({ name: 'subcomment' })
  subcomment: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @Transform(({ obj }) => obj.user.id)
  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'approved' })
  approved: boolean;
}
