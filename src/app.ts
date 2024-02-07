import express from 'express';
import * as bodyParser from 'body-parser';
const config = require(`../config/default`);

import ApiRoutes from './api/routes/routes';
import cors from 'cors';
import { cacheService } from './services/cache.service';
require('dotenv').config();

class App {
  public app: express.Application;
  public port: number;

  constructor(port: any) {
    this.app = express();
    this.port = port;

    this.initAppUsage();
  }

  private initAppUsage() {
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cors());
    this.app.use(function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.header(
        'Access-Control-Allow-Origin',
        'https://www.google.com, https://www.facebook.com, http://localhost:*'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
  }

  private initializeRoutes() {
    const apiRoutes = new ApiRoutes();
    this.app.use('/api', apiRoutes.router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });

    this.app.on('error', function (e) {
      console.log('error:' + e);
    });
  }
}

export default App;
