import { NextFunction } from 'grammy';

import { logger } from '../logger';
import { MyContext } from '../types/context';

export const middleware = () => (ctx: MyContext, next: NextFunction) => {
  logger.debug('🆕 Update received', ctx.update);
  return next();
};
