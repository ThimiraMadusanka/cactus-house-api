import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AddToCartDto } from '../dto/addToCart.dto';
import { UserService } from 'src/user/service/user.service';
import { CART } from 'src/constants/constants';
import { CartModel } from '../entities/cart.entity';
import { ProductService } from 'src/product/service/product.service';
import { ProductModel } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART)
    private Cart: typeof CartModel,

    private readonly userService: UserService,

    private readonly productService: ProductService,
  ) {}

  async getAllCartItemsByUserId(userId: number) {
    await this.userService.getUserById(userId);

    const cartList = await this.Cart.findAndCountAll({
      where: {
        userRid: userId,
      },
      include: [{ model: ProductModel }],
      raw: true,
    });

    return cartList.rows;
  }

  async addToCart(addToCartDto: AddToCartDto) {
    const { userRid, productRid, amount } = addToCartDto;

    await this.userService.getUserById(userRid);

    await this.productService.getProductById(productRid);

    const cart = await this.Cart.create({
      userRid: userRid,
      productRid: productRid,
      amount: amount,
    });

    return cart.toJSON();
  }

  async removeFromCart(id: any) {
    const cart = await this.Cart.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!cart) {
      throw new HttpException(
        `Cart not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.Cart.destroy({
      where: {
        id: id,
      },
    });
  }
}
