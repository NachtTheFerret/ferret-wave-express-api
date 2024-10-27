import Express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { variables } from './dotenv';
import { router } from './routes/router';

export const server = Express();

server.use(urlencoded({ extended: true }));
server.use(Express.json());
server.use(cors());
server.use(cookieParser(variables.PRIVATE_COOKIE_SECRET));

server.use(router);
