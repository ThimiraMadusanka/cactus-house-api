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
import { Auth } from 'src/authentication/decorator/auth.decorator';

@Controller('/v1/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/all')
  @Auth('USER', 'ADMIN')
  async getAllCartItemsByUserId(@Query('user_id') userId: number) {
    return await this.cartService.getAllCartItemsByUserId(userId);
  }

  @Post('/add')
  @Auth('USER')
  @HttpCode(201)
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return await this.cartService.addToCart(addToCartDto);
  }

  @Delete('/remove/:id')
  @Auth('USER')
  @HttpCode(204)
  async removeFromCart(@Param('id') id: any) {
    return await this.cartService.removeFromCart(id);
  }
}
