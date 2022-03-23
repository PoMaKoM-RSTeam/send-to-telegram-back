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
    scheduleDateTime: await ctx.session.postDraft.scheduleDateTime,
  }).save();
  return post;
}

export const saveMenu = new Menu<MyContext>('processingPost')
  .text(
    () => `✅ Post is ready. Save!`,
    async (ctx) => {
      await savePostToDataBase(ctx);
      await ctx.reply(ctx.i18n.t(`save`));
      ctx.session.postDraft = null;
      ctx.session.step = 'no_step';
      await menuMiddleware.replyToContext(ctx, `/channels/actions:${ctx.session.chanelId}/`);
    }
  )
  .text(
    () => '📅 Send by schedule',
    async (ctx) => {
      await ctx.reply(ctx.i18n.t('postDay'), {
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
      ctx.reply(ctx.i18n.t(`cancel`));
    }
  );
