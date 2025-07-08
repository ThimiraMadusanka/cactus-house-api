import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/constants/constants';
import { ContactModel } from 'src/contact/entities/contact.entity';
import { OrderModel } from 'src/order/entities/order.entity';
import { UserModel } from 'src/user/entities/user.entity';

export const DatabaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DBHOST,
        username: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
      });
      sequelize.addModels([OrderModel, ContactModel, UserModel]);
      sequelize
        .authenticate()
        .then(() => {
          console.log('Connected to database -> from Sequelize:');
        })
        .catch((ejs: any) => {
          console.log('Failed to connect to database -> from Sequelize', ejs);
        });
      return sequelize;
    },
  },
];
