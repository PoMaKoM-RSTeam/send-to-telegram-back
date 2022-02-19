import { NextFunction, Request, Response } from 'express';
import ApiError from '../apiError/apiError';
import { IUserModel } from '../interfaces/modelsInterfaces';
import userService from '../service/userService';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.method === 'OPTIONS') {
      return next();
    }
    if (!req.headers.userdata) {
      return next(ApiError.unauthorized('Unauthorized user'));
    }
    const userObj: IUserModel = JSON.parse(req.headers.userdata as string);
    console.log(userObj);
    await userService.checkUserData(userObj.id, userObj.first_name, userObj.username, userObj.auth_date, userObj.hash);
    return next();
  } catch (e) {
    return next(ApiError.unauthorized(e.message));
  }
};
