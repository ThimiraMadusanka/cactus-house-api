import { UserModel } from '../entities/user.entity';
import { USER } from 'src/constants/constants';

export const UserProvider = [
  {
    provide: USER,
    useValue: UserModel,
  },
];
