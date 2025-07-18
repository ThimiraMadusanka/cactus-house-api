import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SummaryController } from './controller/summary.controller';
import { SummaryService } from './service/summary.service';
import { UserModule } from 'src/user/user.module';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CartModule,
    ProductModule,
    OrderModule,
    ContactModule,
  ],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
