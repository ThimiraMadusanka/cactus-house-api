import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { SignInDto } from '../dto/signIn.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { ForgetPasswordDto } from '../dto/forgetPassword.dto';
import { SignUpDto } from '../dto/signUp.dto';

@Controller('/v1')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/sign_in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authenticationService.signIn(signInDto);
  }

  @Post('/sign_up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authenticationService.signUp(signUpDto);
  }

  @Post('/forget_password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return await this.authenticationService.forgetPassword(forgetPasswordDto);
  }

  @Post('/reset_password')
  async resetPassword(
    @Headers('Authorization') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.authenticationService.resetPassword(
      token,
      resetPasswordDto,
    );
  }
}
