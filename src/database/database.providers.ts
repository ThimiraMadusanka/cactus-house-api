import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        username: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
      });
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
