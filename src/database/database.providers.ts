import { Sequelize } from 'sequelize-typescript';
import { CartModel } from 'src/cart/entities/cart.entity';
import { ChatResourceModel } from 'src/chat/entities/chatResource.entity';
import { ConversationModel } from 'src/chat/entities/conversation.entity';
import { SEQUELIZE } from 'src/constants/constants';
import { ContactModel } from 'src/contact/entities/contact.entity';
import { OrderModel } from 'src/order/entities/order.entity';
import { ProductModel } from 'src/product/entities/product.entity';
import { UserModel } from 'src/user/entities/user.entity';

export const DatabaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([
        OrderModel,
        ContactModel,
        ChatResourceModel,
        ConversationModel,
        UserModel,
        ProductModel,
        CartModel,
      ]);
      sequelize
        .authenticate()
        .then(async () => {
          console.log('Connected to database -> from Sequelize:');

          await sequelize.sync();
          console.log('Sequelize models synchronized');
        })
        .catch((ejs: any) => {
          console.log('Failed to connect to database -> from Sequelize', ejs);
        });
      return sequelize;
    },
  },
];
