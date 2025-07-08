import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { OrderProvider } from './providers/order.provider';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService, ...OrderProvider],
})
export class OrderModule {}
