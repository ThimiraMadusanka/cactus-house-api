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
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AWSModule,
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: process.env.REGION,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        accessKeyId: process.env.ACCESS_KEY_ID,
      },
      services: [S3],
    }),
    OrderModule,
    ProductModule,
    ContactModule,
    UserModule,
    ChatModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
