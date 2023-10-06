import * as jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../graphql/Auth';
export interface AuthTokenPayLoad {
   userId: number;
}
export const auth = (header: string): AuthTokenPayLoad => {
   const token = header.split(' ')[1];
   if (!token) throw new Error('Invalid token');
   const res = jwt.verify(token, TOKEN_SECRET);
   console.log('❄️ ~ file: auth.ts:10 ~ res:', res);
   return res as AuthTokenPayLoad;
};
