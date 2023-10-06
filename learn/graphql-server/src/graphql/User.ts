import { extendType, floatArg, nonNull, objectType, stringArg } from 'nexus';
import { NexusGenObjects } from '../../nexus-typegen';
import { Product } from '../entities/Product';
import { Context } from '../types/Context';
import { User } from '../entities/User';
export const UserType = objectType({
   name: 'User',
   definition(t) {
      t.nonNull.int('id');
      t.nonNull.string('username');
      t.nonNull.string('password');
      t.nonNull.string('email');
   },
});

export const UsersQuery = extendType({
   type: 'Query',
   definition(t) {
      t.nonNull.list.nonNull.field('users', {
         type: 'User',
         resolve: async (_parent, _args, context: Context, _info) => {
            const { conn } = context;
            return await conn.query('select * from "user"');
         },
      });
   },
});
