import { ApolloServer } from '@apollo/server';
import dotenv from 'dotenv';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express, { Express, NextFunction, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schema } from './schema';
import mongoose from 'mongoose';
import { getAuth } from 'firebase-admin/auth';
import './firebase/config';
import { Context } from './type/Context';
dotenv.config();
const app: Express = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
   schema,
   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const URI = process.env.URI!;
const PORT = process.env.PORT || 4000;
mongoose.connect(URI).then(async () => {
   console.log('Connected to DB');
   await server.start();
   const authorization = async (
      req: Request,
      res: Response,
      next: NextFunction,
   ) => {
      const accessToken = req.headers.authorization;

      if (accessToken) {
         const result = await getAuth().verifyIdToken(accessToken);
         if (result) {
            res.locals.uid = result.uid;
         }
         next();
      } else return res.status(401).json('Not authorization');
   };
   app.use(
      cors(),
      authorization,
      bodyParser.json(),
      expressMiddleware(server, {
         context: async ({ req, res }): Promise<Context> => {
            return { uid: res.locals.uid };
         },
      }),
   );
   await new Promise<void>((resolve) => httpServer.listen({ port: PORT }));
   console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
