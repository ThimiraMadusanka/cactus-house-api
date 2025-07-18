import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { col, fn } from 'sequelize';
import { CartModel } from 'src/cart/entities/cart.entity';
import {
  CART,
  CONTACT,
  DELIVERED,
  ORDER,
  PENDING,
  PRODUCT,
  REJECTED,
  USER,
} from 'src/constants/constants';
import { ContactModel } from 'src/contact/entities/contact.entity';
import { OrderModel } from 'src/order/entities/order.entity';
import { ProductModel } from 'src/product/entities/product.entity';
import { UserModel } from 'src/user/entities/user.entity';

@Injectable()
export class SummaryService {
  constructor(
    @Inject(USER)
    private User: typeof UserModel,

    @Inject(PRODUCT)
    private Product: typeof ProductModel,

    @Inject(ORDER)
    private Order: typeof OrderModel,

    @Inject(CART)
    private Cart: typeof CartModel,

    @Inject(CONTACT)
    private Contact: typeof ContactModel,
  ) {}

  async getAdminSummary() {
    const userCount = await this.User.count();

    const productCount = await this.Product.count();

    const orderCount = await this.Order.count();

    const contactCount = await this.Contact.count();

    const summary = await this.weeklySummary();

    const response = {
      userCount: userCount - 1,
      productCount: productCount,
      orderCount: orderCount,
      contactCount: contactCount,
      weeklySummary: summary,
    };

    return response;
  }

  async getAccountSummary(userId: any) {
    const deliveredOrderCount = await this.Order.count({
      where: {
        userRid: userId,
        status: DELIVERED,
      },
    });

    const pendingOrderCount = await this.Order.count({
      where: {
        userRid: userId,
        status: PENDING,
      },
    });

    const rejectedOrderCount = await this.Order.count({
      where: {
        userRid: userId,
        status: REJECTED,
      },
    });

    const cartCount = await this.Cart.count({
      where: {
        userRid: userId,
      },
    });

    const summary = await this.weeklySummary(userId);

    const response = {
      deliveredOrderCount: deliveredOrderCount,
      pendingOrderCount: pendingOrderCount,
      rejectedOrderCount: rejectedOrderCount,
      cartCount: cartCount,
      weeklySummary: summary,
    };

    return response;
  }

  async weeklySummary(userId?: any) {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const whereClause: any = {
      createdAt: {
        [Op.between]: [sevenDaysAgo, today],
      },
    };

    if (userId) {
      whereClause.userRid = userId;
    }

    const result = await this.Order.findAll({
      attributes: [
        [fn('DATE', col('created_time')), 'date'],
        [fn('COUNT', '*'), 'count'],
      ],
      where: whereClause,
      group: ['date'],
      order: [['date', 'ASC']],
      raw: true,
    });

    const days: string[] = [];
    const count: number[] = [];
    const dateMap = new Map(result.map((r: any) => [r.date, Number(r.count)]));

    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(sevenDaysAgo.getDate() + i);
      const isoDate = d.toISOString().split('T')[0];
      const date = d.toLocaleString('en-US', { weekday: 'long' });

      days.push(date);
      count.push(dateMap.get(isoDate) || 0);
    }

    return {
      days: days,
      count: count,
    };
  }
}
