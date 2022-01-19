import { Telegraf, Markup } from 'telegraf';
import { generateUpdateMiddleware } from 'telegraf-middleware-console-time';
import models from '../models/models';
import config from '../config/config';

export default async () => {
  const bot = new Telegraf(config.TOKEN);

  // Show what telegram updates (messages, button clicks, ...) are happening (only in development)
  if (process?.env?.NODE_ENV !== 'production') {
    bot.use(generateUpdateMiddleware());
  }

  bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id);

    // Using context shortcut
    ctx.leaveChat();
  });

  bot.command('actions', async (ctx) =>
    ctx.reply(
      `Hello ${ctx.update.message.from.first_name}, hope you enjoy our application!`,
      Markup.keyboard([
        ['🤖 Bots', '💻 Channels'],
        ['✒️ Posts', '📧 Messages'],
        ['👥 Users', '📅 Schedule', '📊 Stats'],
      ])
        .oneTime()
        .resize()
    )
  );

  bot.command('users', async (ctx) => {
    const allUsers = await models.userModel.find({});
    console.log(allUsers);
    return ctx.reply(allUsers.join(''));
  });

  bot.hears('🤖 Bots', (ctx) => ctx.reply('Hello!'));
  bot.hears('👥 Users', (ctx) => ctx.reply('User data!'));

  bot.on('text', (ctx) => {
    console.log(ctx);
    // Explicit usage
    // ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);
    // const user = ctx.update.message.from.first_name;
    // Using context shortcut
    // ctx.reply(`Hello ${ctx.update.message.from.first_name}, hope you enjoy our application!`);
  });

  bot.on('callback_query', (ctx) => {
    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

    // Using context shortcut
    ctx.answerCbQuery();
  });

  bot.on('inline_query', (ctx) => {
    const result = [];
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

    // Using context shortcut
    ctx.answerInlineQuery(result);
  });

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  await bot.launch();
};
