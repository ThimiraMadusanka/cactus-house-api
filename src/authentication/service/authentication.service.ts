import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  async logIn() {
    return 'Authentication';
  }
}
