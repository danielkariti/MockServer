import { Router } from 'express';
import { UserController } from '../../../controllers/user.controller';

class V1Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const userController = new UserController();

    this.router.use('/users', userController.router);
  }
}

export default V1Routes;
