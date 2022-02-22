import { Composer } from 'grammy';
import { isPrivate } from 'grammy-guard';

import { MyContext } from '../types/context';
import { logger } from '../logger';
import { getMetadata } from '../helpers/logging';

export const welcomeComposer = new Composer<MyContext>();

const filteredComposer = welcomeComposer.filter(isPrivate);

filteredComposer.command('start', async (ctx) => {
  logger.info('👋 Handle start command', getMetadata(ctx));

  await ctx.replyWithChatAction('typing');
  // await ctx.reply(
  //   'This is a bot to automate posting to your channel.\n' +
  //     'Use the /menu command to go to the main menu.\n' +
  //     'For more information, use the /help command.'
  // );
  await ctx.reply(ctx.i18n.t(`startMessage`));
});
