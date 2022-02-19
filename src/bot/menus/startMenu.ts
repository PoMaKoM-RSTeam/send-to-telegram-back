import { MenuMiddleware, MenuTemplate } from 'grammy-inline-menu/dist/source';
import { MyContext } from '../types/context';
import { channelsMenu } from './channelsMenu';

export const startMenu = new MenuTemplate<MyContext>(() => ({
  text: 'Неllo!',
  parse_mode: 'Markdown',
}));

startMenu.submenu('💻 Channels', 'channels', channelsMenu);

export const menuMiddleware = new MenuMiddleware<MyContext>('/', channelsMenu);
