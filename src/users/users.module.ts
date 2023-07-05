import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

// Services
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

// Interceptors
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor
  }]
})
export class UsersModule { }
