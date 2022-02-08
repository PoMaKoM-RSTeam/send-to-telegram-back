import { User } from '@grammyjs/types';
import { logger } from '../logger';

const logMeta = {
  caller: 'users.service',
};

// TODO: Переписать на монгу и подумать о ролях и тд.
export const findOrCreateByTelegramId = async (telegramId: number) => {
  logger.debug('find or create user by telegram id', telegramId, logMeta);

  return {} as User;

  // return prisma.user.upsert({
  //   where: {
  //     telegramId,
  //   },
  //   update: {},
  //   create: {
  //     telegramId,
  //   },
  // });
};

export const updateByTelegramId = async (telegramId: number) => {
  logger.debug('Update user by telegram id', telegramId, logMeta);

  // return prisma.user.update({
  //   where: {
  //     telegramId,
  //   },
  // });
};

export const getTotalCount = async () => {
  logger.debug('get total users count', logMeta);

  // return prisma.user.count();
};
