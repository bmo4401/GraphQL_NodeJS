import { DataSource } from 'typeorm';
import { Product } from './entities/Product';
import { User } from './entities/User';
export const CONNECTION_STRING =
   'postgresql://postgres:haipostgres4401@localhost:8000/apollographql';
export default new DataSource({
   type: 'postgres',
   url: CONNECTION_STRING,
   entities: [Product, User],
   synchronize: true,
});
