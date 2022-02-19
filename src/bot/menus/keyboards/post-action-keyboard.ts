import { Menu } from '@grammyjs/menu';
import { PostModel } from '../../../models/models';
import { MyContext } from '../../types/context';

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
      ctx.session.postDraft = null;
      ctx.session.chanelId = null;
      ctx.session.step = null;
    }
  )
  .text(
    () => `🚫 Cancel post creation!`,
    (ctx) => {
      ctx.session.postDraft = null;
      ctx.reply(`Cancelled!`);
    }
  );
