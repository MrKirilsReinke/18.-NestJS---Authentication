import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/users/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService, AuthService],
})
export class CommentsModule {}
