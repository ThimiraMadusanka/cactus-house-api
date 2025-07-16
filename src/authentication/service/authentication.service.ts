import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from '../dto/signIn.dto';
import { SignUpDto } from '../dto/signUp.dto';
import { ForgetPasswordDto } from '../dto/forgetPassword.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { UserService } from 'src/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { ACTIVE, DEACTIVE } from 'src/constants/constants';

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

    if (user.status === DEACTIVE) {
      await this.userService.userStatusChange(user.id, ACTIVE);
    }

    return {
      access_token: await this.jwtService.signAsync(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        billingAddress: user.billingAddress,
        type: user.type,
      },
    };
  }

  async signUp(signUpDto: SignUpDto) {
    await this.userService.createUser(signUpDto);
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto;

    const user = await this.userService.getUserByEmail(email);

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const { newPassword, confirmPassword } = resetPasswordDto;

    if (newPassword !== confirmPassword) {
      throw new HttpException(
        'Password and confirm password are not matching.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const { id } = this.jwtService.decode(token.split(' ')[1]);

    return await this.userService.resetPasswordUser(id, {
      password: newPassword,
    });
  }
}
