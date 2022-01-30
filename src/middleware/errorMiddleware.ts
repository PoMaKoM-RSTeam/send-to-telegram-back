import { NextFunction, Request, Response } from 'express';
import ApiError from '../apiError/apiError';

export default (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  console.log(typeof next);
  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Unknown error' });
};
