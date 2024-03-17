import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from 'src/users/auth.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User) {
    const comment = this.commentsRepository.create(createCommentDto);
    comment.user = user;

    return await this.commentsRepository.save(comment);
  }

  async findAll() {
    return await this.commentsRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.commentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async changeApproval(id: number, approved: boolean) {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Subject is not found');
    }

    comment.approved = approved;
    return this.commentsRepository.save(comment);
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto /* , user: User */,
  ) {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const commentUserId = comment.user.id;

    const userId = await this.authService.getCurrentUserId();
    // console.log(userId, 'userId');
    // console.log(commentUserId, 'commentUserId');

    if (commentUserId !== userId) {
      throw new NotFoundException('You can update only your comments');
    }

    comment.text = updateCommentDto.text;
    Object.assign(updateCommentDto);

    return this.commentsRepository.save(comment);
  }

  async remove(id: number, user: User) {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== user.id) {
      throw new NotFoundException(
        'You are not authorized to update this comment',
      );
    }

    return this.commentsRepository.delete(comment);
  }
}
