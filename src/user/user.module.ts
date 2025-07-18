import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserProvider } from './providers/user.provider';
import { USER } from 'src/constants/constants';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProvider],
  exports: [UserService, USER],
})
export class UserModule {}
