import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
