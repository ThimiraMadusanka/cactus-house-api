import { CartModel } from '../entities/cart.entity';
import { CART } from 'src/constants/constants';

export const CartProvider = [
  {
    provide: CART,
    useValue: CartModel,
  },
];
