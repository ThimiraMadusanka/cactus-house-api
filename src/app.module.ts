import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AWSModule } from './aws/aws.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AWSModule,
    OrderModule,
    CartModule,
    ProductModule,
    ContactModule,
    UserModule,
    ChatModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
