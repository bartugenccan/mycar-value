import { Controller, Post, Body, Get, Param, Query, Delete, Patch, UseGuards } from '@nestjs/common';

// DTOS
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

// Service
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

// Interceptors
import { Serialize } from 'src/interceptors/serialize.interceptor';

// Session
import { Session } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { User } from './user.entity';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService, private authService: AuthService) { }

    @Get('/currentuser')
    @UseGuards(AuthGuard)
    currentUser(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null;
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
