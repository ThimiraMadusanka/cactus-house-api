import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UserUpdateDto } from '../dto/userUpdate.dto';
import { UserResetPasswordDto } from '../dto/userResetPassword.dto';
import { Auth } from 'src/authentication/decorator/auth.decorator';

@Controller('/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Auth('ADMIN')
  async getUsers(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('status') status?: string,
  ) {
    return await this.userService.getUsers(page, size, status);
  }

  @Get('/:id')
  @Auth('USER', 'ADMIN')
  async getUserById(@Param('id') id: any) {
    return await this.userService.getUserById(id);
  }

  @Post()
  @Auth('USER', 'ADMIN')
  @HttpCode(201)
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }

  @Put('/:id')
  @Auth('USER', 'ADMIN')
  async updateUser(@Param('id') id: any, @Body() userUpdateDto: UserUpdateDto) {
    return await this.userService.updateUser(id, userUpdateDto);
  }

  @Patch('/password/:id')
  @Auth('USER', 'ADMIN')
  async resetPasswordUser(
    @Param('id') id: any,
    @Body() userResetPasswordDto: UserResetPasswordDto,
  ) {
    return await this.userService.resetPasswordUser(id, userResetPasswordDto);
  }

  @Patch('/:id')
  @Auth('USER', 'ADMIN')
  async userStatusChange(
    @Param('id') id: any,
    @Query('status') status: string,
  ) {
    return await this.userService.userStatusChange(id, status);
  }

  @Delete('/:id')
  @Auth('USER', 'ADMIN')
  @HttpCode(204)
  async deleteUser(@Param('id') id: any) {
    return await this.userService.deleteUser(id);
  }
}
