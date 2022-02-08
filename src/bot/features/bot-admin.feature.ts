import { Composer } from 'grammy';
import { isPrivate, isUserId } from 'grammy-guard';

import { MyContext } from '../types/context';
import { logger } from '../logger';
import { getMetadata } from '../helpers/logging';
import { getPrivateChatCommands } from '../helpers/bot-commands';
import { config } from '../../config/config';

export const botAdminComposer = new Composer<MyContext>();

const filteredComposer = botAdminComposer.filter(isPrivate).filter(isUserId(config.BOT_ADMIN_USER_ID));

filteredComposer.command('setcommands', async (ctx) => {
  logger.info('Handle setcommands command', getMetadata(ctx));
  await ctx.replyWithChatAction('upload_document');

  // set private chat commands
  await ctx.api.setMyCommands(getPrivateChatCommands(), {
    scope: {
      type: 'all_private_chats',
    },
  });

  // set private chat admin commands
  await ctx.api.setMyCommands(
    [
      ...getPrivateChatCommands(),
      {
        command: 'setcommands',
        description: 'Set bot commands',
      },
    ],
    {
      scope: {
        type: 'chat',
        chat_id: config.BOT_ADMIN_USER_ID,
      },
    }
  );

  return ctx.reply('Commands updated');
});
