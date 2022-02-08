import { NextFunction } from 'grammy';

import { MyContext } from '../types/context';
import { usersService } from '../services';
import { logger } from '../logger';

export const middleware = () => async (ctx: MyContext, next: NextFunction) => {
  if (ctx.from?.is_bot === false) {
    logger.info('✏  Trying to register a user...', ctx.from);

    const { id: telegramId } = ctx.from;

    ctx.user = await usersService.findOrCreateByTelegramId(telegramId);
  }

  return next();
};
