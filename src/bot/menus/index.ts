import { MenuMiddleware } from 'grammy-inline-menu/dist/source';
import { Composer } from 'grammy';
import { isPrivate } from 'grammy-guard';
import { config } from '../../config/config';
import { logger } from '../logger';
import { MyContext } from '../types/context';
import { startMenu } from './startMenu';

// Init menus
export const menuMiddleware = new MenuMiddleware<MyContext>('/', startMenu);
if (config.isDev) {
  logger.info('🌳 Bot menu tree', menuMiddleware.tree());
}

// Init comands for menu
export const menuComposer = new Composer<MyContext>();
const filteredComposer = menuComposer.filter(isPrivate);

filteredComposer.command('menu', async (ctx) => menuMiddleware.replyToContext(ctx));
filteredComposer.command('my_channels', async (ctx) => menuMiddleware.replyToContext(ctx, '/channels/'));
