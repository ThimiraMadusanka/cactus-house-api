import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { OrderProvider } from './providers/order.provider';
import { UserModule } from 'src/user/user.module';
import { CartModule } from 'src/cart/cart.module';
import { ORDER } from 'src/constants/constants';

@Module({
  imports: [DatabaseModule, UserModule, CartModule],
  controllers: [OrderController],
  providers: [OrderService, ...OrderProvider],
  exports: [ORDER],
})
export class OrderModule {}
