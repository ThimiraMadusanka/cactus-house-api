import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderCreateDto } from '../dto/orderCreate.dto';
import { OrderUpdateDto } from '../dto/orderUpdate.dto';

@Controller('/v1/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('status') status?: string,
  ) {
    return await this.orderService.getOrders(page, size, status);
  }

  @Get('/:id')
  async getOrderById(@Param('id') id: any) {
    return await this.orderService.getOrderById(id);
  }

  @Post()
  @HttpCode(201)
  async createOrder(@Body() orderCreateDto: OrderCreateDto) {
    return await this.orderService.createOrder(orderCreateDto);
  }

  @Put('/:id')
  async updateOrder(
    @Param('id') id: any,
    @Body() orderUpdateDto: OrderUpdateDto,
  ) {
    return await this.orderService.updateOrder(id, orderUpdateDto);
  }

  @Patch('/:id')
  async orderStatusChange(
    @Param('id') id: any,
    @Query('status') status: string,
  ) {
    return await this.orderService.orderStatusChange(id, status);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteOrder(@Param('id') id: any) {
    return await this.orderService.deleteOrder(id);
  }
}
