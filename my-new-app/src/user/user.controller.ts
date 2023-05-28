import {
  Body,
  CacheInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(CacheInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const { rows, count } = await this.userService.findAll(page, limit);
    const response = {
      data: rows,
      meta: {
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      },
    };
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:userId')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.update(updateUserDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId)
      ? 'User deleted successfully'
      : 'Something went wrong';
  }
}
