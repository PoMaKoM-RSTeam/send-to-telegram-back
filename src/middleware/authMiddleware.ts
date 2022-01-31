import { NextFunction, Request, Response } from 'express';
import ApiError from '../apiError/apiError';
import userService from '../service/userService';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.method === 'OPTIONS') {
      return next();
    }
    const { id, firstName, username, authDate, hash } = JSON.parse(req.headers.authData as string);
    await userService.checkUserData(id, firstName, username, authDate, hash);
    return next();
  } catch (e) {
    return next(ApiError.badRequest('User is unauthorized'));
  }
};
