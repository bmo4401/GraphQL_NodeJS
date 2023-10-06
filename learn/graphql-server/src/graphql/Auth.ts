import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { Context } from '../types/Context';
import argon2 from 'argon2';
import { User } from '../entities/User';
import * as jwt from 'jsonwebtoken';
import { NexusGenObjects } from '../../nexus-typegen';

export const TOKEN_SECRET =
   '482e246aada0f73a3d0ea0f875cc084a53ac9dd232ec03e926bbcabfc618e1d4f8f1108690192c165d1a283aecab06cab7c6b00bacb684a9c1100afca2307202';
export const AuthType = objectType({
   name: 'AuthType',
   definition(t) {
      t.nonNull.string('token');
      t.nonNull.field('user', {
         type: 'User',
      });
   },
});

export const AuthMutation = extendType({
   type: 'Mutation',
   definition(t) {
      t.nonNull.field('login', {
         type: 'AuthType',
         args: {
            username: nonNull(stringArg()),
            password: nonNull(stringArg()),
         },
         resolve: async (_parent, args, context: Context, _info) => {
            const { conn } = context;
            const { username, password } = args;
            const user = await User.findOne({ where: { username } });
            if (!user) throw new Error('User not found');
            const isValid = await argon2.verify(user.password, password);
            if (!isValid) throw new Error('Invalid credentials');
            const token = jwt.sign({ userId: user.id }, TOKEN_SECRET);
            return { token, user };
         },
      });
      t.nonNull.field('register', {
         type: 'AuthType',
         args: {
            username: nonNull(stringArg()),
            email: nonNull(stringArg()),
            password: nonNull(stringArg()),
         },

         resolve: async (
            _parent,
            args,
            context: Context,
            _info,
         ): Promise<NexusGenObjects['AuthType']> => {
            const { conn } = context;
            const { username, email, password } = args;
            console.log('❄️ ~ file: Auth.ts:56 ~ username:', username);
            const hashedPassword = await argon2.hash(password);
            let user;
            let token: string = '';
            try {
               const result = await conn
                  .createQueryBuilder()
                  .insert()
                  .into(User)
                  .values({ username, email, password: hashedPassword })
                  .returning('*')
                  .execute();
               user = result.raw[0];
               token = jwt.sign({ userId: user.id }, TOKEN_SECRET);
            } catch (error) {}
            console.log('❄️ ~ file: Auth.ts:72 ~ user:', user);
            return {
               user,
               token,
            };
         },
      });
   },
});
