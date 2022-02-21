import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu/dist/source';
import { PostModel } from '../../models/models';
import { MyContext } from '../types/context';
import { scheduleMenu } from './scheduleMenu';

export const postMenu = new MenuTemplate<MyContext>(() => ({
  text: 'Post actions',
  parse_mode: 'Markdown',
}));

postMenu.interact('add new post', 'add', {
  do: async (ctx) => {
    ctx.session.step = 'add_new_post';
    await ctx.reply('Give me post!');
    return true;
  },
});

// postMenu.submenu('edit post', 'edit', scheduleMenu);

export const deleteMenu = new MenuTemplate<MyContext>(() => ({
  text: 'Here you can remove posts',
  parse_mode: 'Markdown',
}));

postMenu.submenu('delete post', 'delete', deleteMenu);

async function name() {
  const allPost = await PostModel.find({});
  const buttons = [];
  allPost.forEach((post) => {
    // eslint-disable-next-line no-underscore-dangle
    buttons.push(String(post?.text?.caption?.trim().slice(0, 24) || post?._id));
  });
  return buttons;
}

deleteMenu.choose('', () => name(), {
  columns: 1,
  do: async (ctx, key) => {
    await PostModel.deleteOne({ caption: key.startsWith(key.trim().slice(24)) });
    await ctx.answerCallbackQuery(`Post №${key.slice(-24)} has been deleted.`);
    return true;
  },
});

deleteMenu.manualRow(createBackMainMenuButtons());
export const menuMiddleware = new MenuMiddleware<MyContext>('/', scheduleMenu);
