import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { ApproveCommentDto } from './dto/approve-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const comment = this.commentsRepository.create(createCommentDto);
    comment.user = user;

    return await this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentsRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Comment | null> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Subject is not found');
    }

    return comment;
  }

  async changeApproval(
    id: number,
    approveCommentDto: ApproveCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Subject is not found');
    }

    comment.approved = approveCommentDto.approved;
    return this.commentsRepository.save(comment);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, user: User) {
    const userId = user.id;

    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const commentUserId = comment.user.id;

    if (commentUserId !== userId) {
      throw new NotFoundException('You can update only your comments');
    }

    comment.subcomment = updateCommentDto.subcomment;
    comment.approved = false;
    Object.assign(comment, updateCommentDto);

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
