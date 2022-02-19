import { NextFunction } from 'grammy';

import { context } from '../context';
import { MyContext } from '../types/context';

export const middleware = () => (ctx: MyContext, next: NextFunction) => {
  const store = new Map();
  return context.run(store, next);
};
