import { Bot } from 'grammy';

import { botAdminComposer } from './features/bot-admin.feature';
import { welcomeComposer } from './features/welcome.feature';
import { handleError } from './helpers/error-handler';
import { MyContext } from './types/context';
import { config } from '../config/config';
import { updatesLogger, setupSession, setupContext, setupLogger } from './middlewares';
import { menuMiddleware } from './menus/startMenu';
import { menuComposer } from './menus';
import { router } from './features/bot-router';
import { saveMenu } from './menus/keyboards/post-action-keyboard';

export const bot = new Bot<MyContext>(config.BOT_TOKEN);

// Middlewares
if (config.isDev) {
  bot.use(updatesLogger());
}

bot.use(setupSession());
bot.use(setupContext());
bot.use(setupLogger());
// bot.use(registerUser());

// Menu
bot.use(menuMiddleware);
bot.use(menuComposer);
bot.use(saveMenu);

// Handlers
bot.use(botAdminComposer);
bot.use(welcomeComposer);

// Router
bot.use(router);

if (config.isDev) {
  bot.catch(handleError);
}
