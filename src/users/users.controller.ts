import { Controller, Post, Body, Get, Param, Query, Delete, Patch, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

// DTOS
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

// Service
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// Interceptors
import { Serialize } from 'src/interceptors/serialize.interceptor';
@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService, private authService: AuthService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.authService.signup(body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        console.log('Handler is running')
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
