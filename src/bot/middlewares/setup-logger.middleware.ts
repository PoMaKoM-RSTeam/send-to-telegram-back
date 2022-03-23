import { NextFunction } from 'grammy';

import { MyContext } from '../types/context';

export const middleware = () => (ctx: MyContext, next: NextFunction) => next();
