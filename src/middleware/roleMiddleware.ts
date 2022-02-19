import { NextFunction, Request } from 'express';
import userService from '../services/userService';

export default (role: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.method === 'OPTIONS') {
      return next();
    }
    const { id } = JSON.parse(req.headers.authData as string);
    await userService.checkUserRole(id, role);
    return next();
  } catch (e) {
    return next(e);
  }
};
