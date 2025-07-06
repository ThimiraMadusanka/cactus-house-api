import { OrderModel } from '../entities/order.entity';
import { ORDER } from 'src/constants/constants';

export const OrderProvider = [
  {
    provide: ORDER,
    useValue: OrderModel,
  },
];
