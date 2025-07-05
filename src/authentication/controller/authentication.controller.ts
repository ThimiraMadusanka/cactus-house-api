import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';

@Controller('/v1')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Get()
  async logIn() {
    return await this.authenticationService.logIn();
  }
}
