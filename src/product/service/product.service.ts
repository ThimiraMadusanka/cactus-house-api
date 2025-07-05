import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  async getProducts() {
    return 'product';
  }
}
