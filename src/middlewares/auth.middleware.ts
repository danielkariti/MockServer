import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/interfaces/IUser'; // Adjust this import according to your user interface
import { cacheService } from '../services/cache.service';
import { authService } from '../services/auth.service';

interface RequestWithUser extends ExpressRequest {
  user?: IUser;
}

export function validate(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - No token provided' });
  }

  const decodedUser = authService.verifyToken(token);
  if (!decodedUser || typeof decodedUser === 'string') {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }

  const loggedInUser = cacheService.getLoggedInUser(
    (decodedUser as JwtPayload).id.toString()
  );
  if (!loggedInUser) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - User not logged in' });
  }

  req.user = loggedInUser;
  next();
}
