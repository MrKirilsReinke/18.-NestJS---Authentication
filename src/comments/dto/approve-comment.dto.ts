import { IsBoolean } from 'class-validator';

export class ApproveCommentDto {
  @IsBoolean()
  approved: boolean;
}
