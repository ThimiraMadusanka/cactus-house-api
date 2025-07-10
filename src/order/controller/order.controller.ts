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
import { Auth } from 'src/authentication/decorator/auth.decorator';

@Controller('/v1/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @Auth('ADMIN')
  async getOrders(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('status') status?: string,
  ) {
    return await this.orderService.getOrders(page, size, status);
  }

  @Get('/user')
  @Auth('USER')
  async getOrdersByUserId(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('user_id') userId: number,
  ) {
    return await this.orderService.getOrdersByUserId(page, size, userId);
  }

  @Get('/:id')
  @Auth('USER', 'ADMIN')
  async getOrderById(@Param('id') id: any) {
    return await this.orderService.getOrderById(id);
  }

  @Post()
  @Auth('USER')
  @HttpCode(201)
  async createOrder(@Body() orderCreateDto: OrderCreateDto) {
    return await this.orderService.createOrder(orderCreateDto);
  }

  @Put('/:id')
  @Auth('USER')
  async updateOrder(
    @Param('id') id: any,
    @Body() orderUpdateDto: OrderUpdateDto,
  ) {
    return await this.orderService.updateOrder(id, orderUpdateDto);
  }

  @Patch('/:id')
  @Auth('ADMIN')
  async orderStatusChange(
    @Param('id') id: any,
    @Query('status') status: string,
  ) {
    return await this.orderService.orderStatusChange(id, status);
  }

  @Delete('/:id')
  @Auth('USER')
  @HttpCode(204)
  async deleteOrder(@Param('id') id: any) {
    return await this.orderService.deleteOrder(id);
  }
}
