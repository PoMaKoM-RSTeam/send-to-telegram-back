import { Telegraf } from 'telegraf';
// import TOKEN from '../index';
import config from '../config/config';

const bot = new Telegraf(config.TOKEN);

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  ctx.leaveChat();
});

bot.on('text', (ctx) => {
  // Explicit usage
  // ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);
  const user = ctx.update.message.from;
  // Using context shortcut
  ctx.reply(`Hello ${user.first_name}, hope you enjoy our application!`);
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

// bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export default bot;
