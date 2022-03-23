import { BotError } from 'grammy';
import { MyContext } from '../types/context';
import { logger } from '../logger';

export const handleError = async (error: BotError<MyContext>) => {
  const { ctx } = error;
  const err = error.error;

  logger.error({
    update_id: ctx.update.update_id,
    err,
  });
};
