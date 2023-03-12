import 'module-alias/register';
import dotenv from 'dotenv';
import AuthController from './handlers/auth/auth.controller';
import App from './app';
import Handler from './handlers/handler';

dotenv.config({ path: './.env' });
const port = parseInt(process.env.PORT, 10);

const app = new App(
  [
    new Handler(),
    new AuthController(),
  ],
  port,
);

app.listen();
