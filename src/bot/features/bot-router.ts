import { Router } from '@grammyjs/router';
import { findLast } from 'lodash';
import { getInitialPostInstance } from '../helpers/post-helpers';
import { menuMiddleware } from '../menus';
import { saveMenu, savePostToDataBase } from '../menus/keyboards/post-action-keyboard';
import { hourKeyboard, minuteKeyboard } from '../menus/keyboards/select-date.keyboard';
import { MyContext } from '../types/context';

// Init router
export const router = new Router<MyContext>((ctx) => ctx.session.step);

// Удалить Post
router.route('add_new_post', async (ctx) => {
  const post = (await ctx.session.postDraft) || getInitialPostInstance(await ctx.session.chanelId);
  if (ctx.message.text) {
    post.text.caption = ctx.message.text;
  }

  const isContainsMedia =
    ctx.message.photo || ctx.message.video || ctx.message.audio || ctx.message.animation || ctx.message.document;
  if (isContainsMedia) {
    if (post.attachments.length === 10) {
      return ctx.reply(ctx.i18n.t(`attachmentsError`));
    }

    if (ctx.message.photo) {
      post.attachments.push({ type: 'photo', mediaId: findLast(ctx.message.photo)?.file_id });
    }
    if (ctx.message.video) {
      post.attachments.push({ type: 'video', mediaId: ctx.message.video.file_id });
    }
    if (ctx.message.audio) {
      post.attachments.push({ type: 'audio', mediaId: ctx.message.audio.file_id });
    }
    if (ctx.message.animation) {
      post.attachments.push({ type: 'animation', mediaId: ctx.message.animation.file_id });
    }
    if (ctx.message.document) {
      post.attachments.push({ type: 'document', mediaId: ctx.message.document.file_id });
    }

    post.text.caption_entities = ctx.message.caption_entities;
  }

  if (post.attachments.length === 10) {
    ctx.reply(ctx.i18n.t(`attachmentsMaximum`));
  }

  ctx.reply(`${ctx.i18n.t('postUpdated')} ${JSON.stringify(post)}`, {
    reply_markup: saveMenu,
  });
  ctx.session.postDraft = post;
  return post;
});

router.route('hour', async (ctx) => {
  await ctx.reply(ctx.i18n.t('postHours'), {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: hourKeyboard.build(),
    },
  });
  ctx.session.postDraft.sendDate.push(ctx.message.text);
  ctx.session.step = 'minute';
  return true;
});

router.route('minute', async (ctx) => {
  await ctx.reply(ctx.i18n.t('postMinutes'), {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: minuteKeyboard.build(),
    },
  });
  ctx.session.postDraft.sendDate.push(ctx.message.text);
  ctx.session.step = 'final';
  return true;
});

router.route('final', async (ctx) => {
  ctx.session.postDraft.sendDate.push(ctx.message.text);
  await ctx.reply(ctx.i18n.t('postTimeReady'), {
    reply_markup: { remove_keyboard: true },
  });
  ctx.session.step = '';
  const postDate = new Date();
  postDate.setFullYear(
    Number(ctx.session.postDraft.sendDate[0].slice(6, 10)),
    Number(ctx.session.postDraft.sendDate[0].slice(3, 5)) === 0
      ? Number(ctx.session.postDraft.sendDate[0].slice(3, 5))
      : Number(ctx.session.postDraft.sendDate[0].slice(3, 5)) - 1,
    Number(ctx.session.postDraft.sendDate[0].slice(0, 2))
  );
  postDate.setHours(Number(ctx.session.postDraft.sendDate[1]));
  postDate.setMinutes(Number(ctx.session.postDraft.sendDate[2]));
  console.log(postDate);
  ctx.session.postDraft.scheduleDateTime = postDate;
  await savePostToDataBase(ctx);
  ctx.session.postDraft = null;
  ctx.session.step = 'no_step';
  menuMiddleware.replyToContext(ctx, `/channels/actions:${ctx.session.chanelId}/post/`);
  return true;
});
