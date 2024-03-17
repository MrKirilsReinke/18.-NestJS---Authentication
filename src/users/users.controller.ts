import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  @UseGuards(AuthGuard)
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signup(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Get('/users')
  async findUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
