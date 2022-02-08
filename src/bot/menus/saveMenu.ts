import { MenuTemplate } from 'grammy-inline-menu/dist/source';
import { MyContext } from '../types/context';

export const saveMenu = new MenuTemplate<MyContext>('Are you ready to save post...?');

saveMenu.interact('Save', 'save', {
  do: async (ctx) => {
    ctx.session.step = 'save';
    await ctx.reply('Save');
    return true;
  },
  hide: () => false,
});
