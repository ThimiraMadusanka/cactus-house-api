import { ProductModel } from '../entities/product.entity';
import { PRODUCT } from 'src/constants/constants';

export const ProductProvider = [
  {
    provide: PRODUCT,
    useValue: ProductModel,
  },
];
