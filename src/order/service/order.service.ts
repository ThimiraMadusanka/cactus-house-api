import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrderCreateDto } from '../dto/orderCreate.dto';
import { OrderUpdateDto } from '../dto/orderUpdate.dto';
import { OrderModel } from '../entities/order.entity';
import { ORDER, PENDING } from 'src/constants/constants';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER)
    private Order: typeof OrderModel,
  ) {}

  async getOrders(page: number = 0, size: number = 10, status?: string) {
    const offset = (page - 1) * size;
    let whereClause: any;

    if (status) {
      whereClause = {
        status: status,
      };
    }

    const orderList = await this.Order.findAndCountAll({
      limit: size,
      offset: offset,
      where: whereClause,
      raw: true,
    });

    return {
      page: page,
      size: size,
      totalCount: orderList.count,
      data: orderList.rows,
    };
  }

  async getOrderById(id: any) {
    const order = await this.Order.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!order) {
      throw new HttpException(
        `Order not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return order;
  }

  async createOrder(orderCreateDto: OrderCreateDto) {
    const {
      userRid,
      productList,
      totalAmount,
      contactNumber,
      shippingAddress,
    } = orderCreateDto;

    const order = await this.Order.create({
      userRid: userRid,
      productList: productList,
      totalAmount: totalAmount,
      contactNumber: contactNumber,
      shippingAddress: shippingAddress,
      status: PENDING,
    });

    return order.toJSON();
  }

  async updateOrder(id: any, orderUpdateDto: OrderUpdateDto) {
    const order = await this.Order.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!order) {
      throw new HttpException(
        `Order not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (order.status !== PENDING) {
      throw new HttpException(
        'Updating is allowed only for pending orders.',
        HttpStatus.NOT_FOUND,
      );
    }

    const { productList, totalAmount, contactNumber, shippingAddress } =
      orderUpdateDto;

    await this.Order.update(
      {
        productList: productList,
        totalAmount: totalAmount,
        contactNumber: contactNumber,
        shippingAddress: shippingAddress,
        status: PENDING,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    throw new HttpException(`Order updated with id ${id}`, HttpStatus.OK);
  }

  async orderStatusChange(id: any, status: string) {
    const order = await this.Order.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!order) {
      throw new HttpException(
        `Order not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.Order.update(
      {
        status: status,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    throw new HttpException(`Order status change with id ${id}`, HttpStatus.OK);
  }

  async deleteOrder(id: any) {
    const order = await this.Order.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!order) {
      throw new HttpException(
        `Order not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (order.status !== PENDING) {
      throw new HttpException(
        'Deleting is allowed only for pending orders.',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.Order.destroy({
      where: {
        id: id,
      },
    });
  }
}
