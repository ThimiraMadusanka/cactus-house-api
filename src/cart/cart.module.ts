import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';
import { CartProvider } from './providers/cart.provider';
import { ProductModule } from 'src/product/product.module';
import { CART } from 'src/constants/constants';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule],
  controllers: [CartController],
  providers: [CartService, ...CartProvider],
  exports: [CartService, CART],
})
export class CartModule {}
