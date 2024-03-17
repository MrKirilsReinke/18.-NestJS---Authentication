import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database: 'db.comments',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
