import { Controller, Get } from '@nestjs/common';
import { OrderService } from '../service/order.service';

@Controller('/v1/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders() {
    return await this.orderService.getOrders();
  }
}
