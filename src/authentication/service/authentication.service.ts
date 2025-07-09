import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from '../dto/signIn.dto';
import { SignUpDto } from '../dto/signUp.dto';
import { ForgetPasswordDto } from '../dto/forgetPassword.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { UserService } from 'src/user/service/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,

    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.getUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, email: user.email, type: user.type };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    await this.userService.createUser(signUpDto);
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto;

    const user = await this.userService.getUserByEmail(email);

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async resetPassword(token, resetPasswordDto: ResetPasswordDto) {
    const { newPassword, confirmPassword } = resetPasswordDto;

    if (newPassword !== confirmPassword) {
      throw new HttpException(
        'Password and confirm password are not matching.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const { sub } = this.jwtService.decode(token);

    return await this.userService.resetPasswordUser(sub, {
      password: newPassword,
    });
  }
}
