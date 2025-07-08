import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ACTIVE, DEACTIVE, USER } from 'src/constants/constants';
import { UserModel } from '../entities/user.entity';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UserUpdateDto } from '../dto/userUpdate.dto';
import { UserResetPasswordDto } from '../dto/userResetPassword.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER)
    private User: typeof UserModel,
  ) {}

  async getUsers(page: number = 0, size: number = 10, status?: string) {
    const offset = (page - 1) * size;
    let whereClause: any;

    if (status) {
      whereClause = {
        status: status,
      };
    }

    const userList = await this.User.findAndCountAll({
      limit: size,
      offset: offset,
      where: whereClause,
      raw: true,
    });

    return {
      page: page,
      size: size,
      totalCount: userList.count,
      data: userList.rows,
    };
  }

  async getUserById(id: any) {
    const user = await this.User.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!user) {
      throw new HttpException(
        `User not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async createUser(userCreateDto: UserCreateDto) {
    const { name, email, password, contactNumber, billingAddress } =
      userCreateDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.User.create({
      name: name,
      email: email,
      password: hashedPassword,
      contactNumber: contactNumber,
      billingAddress: billingAddress,
      type: USER,
      status: ACTIVE,
    });

    return user.toJSON();
  }

  async updateUser(id: any, userUpdateDto: UserUpdateDto) {
    const user = await this.User.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!user) {
      throw new HttpException(
        `User not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.status === DEACTIVE) {
      throw new HttpException(
        'Updating is not allowed for dectivated users.',
        HttpStatus.NOT_FOUND,
      );
    }

    const { name, contactNumber, billingAddress } = userUpdateDto;

    await this.User.update(
      {
        name: name,
        contactNumber: contactNumber,
        billingAddress: billingAddress,
        status: ACTIVE,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    throw new HttpException(`User updated with id ${id}`, HttpStatus.OK);
  }

  async resetPasswordUser(id: any, userResetPasswordDto: UserResetPasswordDto) {
    const user = await this.User.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!user) {
      throw new HttpException(
        `User not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const { password } = userResetPasswordDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.User.update(
      {
        password: hashedPassword,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    throw new HttpException(
      `Successfully password reset with id ${id}`,
      HttpStatus.OK,
    );
  }

  async userStatusChange(id: any, status: string) {
    const user = await this.User.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!user) {
      throw new HttpException(
        `User not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.User.update(
      {
        status: status,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    throw new HttpException(`User status change with id ${id}`, HttpStatus.OK);
  }

  async deleteUser(id: any) {
    const user = await this.User.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!user) {
      throw new HttpException(
        `User not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.User.destroy({
      where: {
        id: id,
      },
    });
  }
}
