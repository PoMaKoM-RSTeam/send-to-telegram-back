import { MenuTemplate } from 'grammy-inline-menu/dist/source';
import { MyContext } from '../types/context';

export const scheduleMenu = new MenuTemplate<MyContext>(() => ({
  text: 'Schedule your posts...',
  parse_mode: 'Markdown',
}));
