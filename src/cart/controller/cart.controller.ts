import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { AddToCartDto } from '../dto/addToCart.dto';

@Controller('/v1/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/all')
  async getAllCartItemsByUserId(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('user_id') userId: number,
  ) {
    return await this.cartService.getAllCartItemsByUserId(page, size, userId);
  }

  @Post('/add')
  @HttpCode(201)
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return await this.cartService.addToCart(addToCartDto);
  }

  @Delete('/remove/:id')
  @HttpCode(204)
  async removeFromCart(@Param('id') id: any) {
    return await this.cartService.removeFromCart(id);
  }
}
