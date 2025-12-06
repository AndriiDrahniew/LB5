import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';
import { getLanguage } from './middleware/getLanguage';
import { dbCreateConnection } from './orm/dbCreateConnection';
import routes from './routes';

export const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(getLanguage);

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
    flags: 'a',
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan('combined'));

app.use('/', routes);

app.use(errorHandler);

const port = process.env.PORT || 4000;
//app.listen(port, () => {
//  console.log(`Server running on port ${port}`);
//});

//(async () => {
//  await dbCreateConnection();
//})();

//(async () => {
//  try {
//    await dbCreateConnection();
//
//    const port = process.env.PORT || 4000;
//    app.listen(port, () => {
//      console.log(`Server running on port ${port}`);
//    });
//
//  } catch (err) {
//    console.error('Database connection error:', err);
//    process.exit(1);
//  }
//})();

(async () => {
  try {
    await dbCreateConnection();
    console.log('📦 Database connection established');

    const routes = (await import('./routes')).default;
    app.use('/', routes);
    app.use(errorHandler);

    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`✅ Server running on port ${port}`);
      });
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
})();