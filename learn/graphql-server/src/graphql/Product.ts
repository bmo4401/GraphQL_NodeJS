1;
import { NexusGenObjects } from '../../nexus-typegen';
import { Product } from '../entities/Product';
import { Context } from '../types/Context';
import { User } from '../entities/User';
import { objectType } from 'nexus/dist/definitions/objectType';
import { extendType, floatArg, nonNull, stringArg } from 'nexus';
export const ProductType = objectType({
   name: 'Product',
   definition(t) {
      t.nonNull.int('id'),
         t.nonNull.string('name'),
         t.nonNull.float('price'),
         t.nonNull.int('creatorId'),
         t.field('createdBy', {
            type: 'User',
            resolve: (parent, _args, _context: Context, _info) => {
               console.log('❄️ ~ file: Product.ts:21 ~ parent:', parent);
               const { creatorId } = parent;
               const result = User.findOne({
                  where: { id: creatorId },
               });
               return result;
            },
         });
   },
});

export const ProductsQuery = extendType({
   type: 'Query',
   definition(t) {
      t.nonNull.list.nonNull.field('products', {
         type: 'Product',
         resolve: (
            _parent,
            _args,
            context: Context,
            _info,
         ): Promise<Product[]> => {
            const { conn } = context;
            return conn.query('select * from product');
         },
      });
   },
});

export const CreateProductMutation = extendType({
   type: 'Mutation',
   definition(t) {
      t.nonNull.field('createProduct', {
         type: 'Product',
         args: {
            name: nonNull(stringArg()),
            price: nonNull(floatArg()),
         },
         resolve: (_parent, args, context, _info) => {
            const { name, price } = args;
            const product = {
               name,
               price,
            };
            return Product.create({ ...product }).save();
         },
      });
   },
});
