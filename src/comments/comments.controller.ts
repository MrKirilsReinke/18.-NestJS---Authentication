import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CommentDto } from './dto/comment.dto';
import { ApproveCommentDto } from './dto/approve-comment.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Serialize(CommentDto)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.create(createCommentDto, user);
  }

  @Put('/approve-comments/:id')
  @UseGuards(AdminGuard)
  approveComment(
    @Param('id') id: number,
    @Body() approveCommentDto: ApproveCommentDto,
  ) {
    return this.commentsService.changeApproval(id, approveCommentDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.update(id, updateCommentDto, user);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.commentsService.remove(+id, user);
  }
}
