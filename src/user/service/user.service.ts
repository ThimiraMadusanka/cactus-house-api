import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUsers() {
    return 'user';
  }
}
