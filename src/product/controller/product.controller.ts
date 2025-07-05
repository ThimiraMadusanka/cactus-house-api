import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('/v1/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }
}
