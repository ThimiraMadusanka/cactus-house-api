import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
