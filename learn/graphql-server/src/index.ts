import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schema';
import typeormConfig from './typeorm.config';
import { Context } from './types/Context';
import { auth } from './middleware/auth';

const boot = async () => {
   const conn = await typeormConfig.initialize();
   const server = new ApolloServer({
      schema,
   });

   const { url } = await startStandaloneServer(server, {
      context: async ({ req }): Promise<Context> => {
         const token = req?.headers?.authorization
            ? auth(req.headers.authorization)
            : null;
         return { conn, userId: token?.userId };
      },
   });
   console.log(`🚀 Server ready at ${url}`);
};

boot();
