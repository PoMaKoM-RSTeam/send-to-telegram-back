import { Menu } from '@grammyjs/menu';
import { menuMiddleware } from '..';
import { PostModel } from '../../../models/models';
import { MyContext } from '../../types/context';
import { dateKeyboard } from './select-date.keyboard';

export async function savePostToDataBase(ctx: MyContext) {
  const post = new PostModel({
    channelId: await ctx.session.postDraft.channel,
    text: await ctx.session.postDraft.text,
    attachments: await ctx.session.postDraft.attachments,
  }).save();
  return post;
}

export const saveMenu = new Menu<MyContext>('processingPost')
  .text(
    () => `✅ Post is ready. Save!`,
    async (ctx) => {
      await savePostToDataBase(ctx);
      ctx.reply(`Saved!`);
      menuMiddleware.replyToContext(ctx, `/channels/actions:${ctx.session.chanelId}/post/`);
      ctx.session.postDraft = null;
      ctx.session.step = null;
      ctx.session.chanelId = null;
    }
  )
  .text(
    () => '📅 Send by schedule',
    async (ctx) => {
      await ctx.reply('Got it! Now, send me the day!', {
        reply_markup: {
          one_time_keyboard: true,
          keyboard: dateKeyboard.build(),
        },
      });
      ctx.session.step = 'hour';
      return true;
    }
  )
  .text(
    () => `🚫 Cancel post creation!`,
    (ctx) => {
      ctx.session.postDraft = null;
      ctx.reply(`Cancelled!`);
    }
  );
