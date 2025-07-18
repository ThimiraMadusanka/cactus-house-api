import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductProvider } from './providers/product.provider';
import { AWSModule } from 'src/aws/aws.module';
import { PRODUCT } from 'src/constants/constants';

@Module({
  imports: [DatabaseModule, AWSModule],
  controllers: [ProductController],
  providers: [ProductService, ...ProductProvider],
  exports: [ProductService, PRODUCT],
})
export class ProductModule {}
