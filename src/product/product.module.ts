import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductProvider } from './providers/product.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...ProductProvider],
})
export class ProductModule {}
