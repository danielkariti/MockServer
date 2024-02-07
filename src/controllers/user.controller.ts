import { Request, Response, NextFunction, Router } from 'express';
import { UserService } from '../services/user.service';
import { validate } from '../middlewares/auth.middleware';

export class UserController {
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.post('/createUser', this.register.bind(this));
    this.router.get('/getUser/:id', validate, this.getUser.bind(this));
    this.router.get('/getUsers/:page', validate, this.getUsers.bind(this));
    this.router.put('/updateUser/:id', validate, this.updateUser.bind(this));
    this.router.delete('/deleteUser/:id', validate, this.delete.bind(this));
    this.router.post('/login', this.login.bind(this));
  }

  public async register(req: Request, res: Response, _next: NextFunction) {
    try {
      console.log('Registering user...');
      const user = {
        ...req.body,
      };
      const userId = await this.userService.createUser(user);
      res.send(userId);
    } catch (err) {
      res.send(err).status(404);
    }
  }

  public async delete(req: Request, res: Response, _next: NextFunction) {
    try {
      console.log('Deleting user');
      if (!req.params.id) throw new Error('Id was not found in the request');
      const userId = await this.userService.deleteUser(req.params.id);
      res.send(userId);
    } catch (err) {
      res.send(err).status(404);
    }
  }

  public async getUser(req: Request, res: Response, _next: NextFunction) {
    try {
      console.log('Getting user');
      if (!req.params.id) throw new Error('Id was not found in the request');
      const user = await this.userService.getUserById(req.params.id);
      res.send(user);
    } catch (err) {
      res.send(err).status(404);
    }
  }

  public async getUsers(req: Request, res: Response, _next: NextFunction) {
    try {
      console.log('Getting users by page');
      if (!req.params.page)
        throw new Error('Page number was not found in the request');
      const users = await this.userService.getUsers(Number(req.params.page));
      res.send(users);
    } catch (err) {
      res.send(err).status(404);
    }
  }

  public async updateUser(req: Request, res: Response, _next: NextFunction) {
    try {
      console.log('Updating user by id');
      if (!req.params.id)
        throw new Error('id was not found in the request params');

      if (!req.body.userToUpdate)
        throw new Error('userToUpdate was not found in the request body');

      const users = await this.userService.updateUser(
        req.params.id,
        req.body.userToUpdate
      );
      res.send(users);
    } catch (err) {
      res.send(err).status(404);
    }
  }

  public async login(req: Request, res: Response, _next: NextFunction) {
    try {
      if (!req.body.email)
        throw new Error('email was not found in the request body');

      const token = await this.userService.login(req.body.email);
      if (!token) throw new Error('user was not found');
      res.send(token);
    } catch (err) {
      res.send(err).status(404);
    }
  }
}
