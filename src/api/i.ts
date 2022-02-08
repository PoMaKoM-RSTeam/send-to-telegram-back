// type MyContext = BaseContext;

// interface SessionData {
//   step: 'idle' | 'day' | 'month'; // which step of the form we are on
//   dayOfMonth?: number; // day of birthday
//   month?: number; // month of birthday
// }

// const menu = new MenuTemplate<MyContext>(() => `RS-CloneBot Controls Menu\n`);
// const mainMenuToggle = false;
// const actionMenu = new MenuTemplate<MyContext>('Сhoose your action...');

// interface actionChoises {
//   action?: string;
// }

// const options2: Record<string, actionChoises> = {
//   add: {},
//   show: {},
//   edit: {},
//   delete: {},
// };

// function optionsButtonText(_: MyContext, key: string): string {
//   const entry = options[key];
//   if (entry?.action) {
//     return key;
//   }
//   return key;
// }

// function actionSelectText(ctx: MyContext): string {
//   const option = ctx.match![1]!;
//   const yourChoice = options[option]!.action;
//   if (!yourChoice) {
//     return option;
//   }
//   return `You choose ${yourChoice} in ${option}`;
// }

// const ctxForChangeBotName = new Statelessctx('ctx2', async (additionalState) => {
//   await editBotInDataBase(models.default.botModel, additionalState, ctx.message.text);
//   await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
// });

// const ctxForChangeChannelName = new Statelessctx('ctx3', async (additionalState) => {
//   await editChannelInDataBase(models.default.channelModel, additionalState, ctx.message.text);
//   await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
// });

// const ctx = new Statelessctx('ctx', async (additionalState) => {
//   // console.log(ctx.update.message.from.id);
//   if (additionalState === 'botAdd') {
//     const newwwbot = new Bot(ctx.message.text);
//     console.log(await newwwbot.api.getMe());
//     console.log(ctx.update.message.from.id);
//     // newwwbot.drop();
//     await saveBotToDataBase(models.default.botModel, ctx.message.text).save();
//     await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
//   } else if (additionalState === 'botEdit') {
//     await ctxForChangeBotName.reply('Type here new bot TOKEN...', ctx.message.text);
//   } else if (additionalState === 'botDelete') {
//     await deleteBotFromDataBase(models.default.botModel, ctx.message.text);
//     await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
//   } else if (additionalState === 'channelAdd') {
//     try {
//       bot.api
//         .getChat(`@${ctx.message.text}`)
//         .then(async (channel) => saveChannelToDataBase(models.default.channelModel, channel).save());
//     } catch (error) {
//       console.log(error);
//     }
//     await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
//   } else if (additionalState === 'channelEdit') {
//     await ctxForChangeChannelName.reply('Type here new channel name...', ctx.message.text);
//   } else if (additionalState === 'channelDelete') {
//     await deleteChannelFromDataBase(models.default.channelModel, ctx.message.text);
//     await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
//   } else if (additionalState === 'dateKeyboard') {
//     console.log(ctx.callbackQuery);
//     await ctx.replyWithKeyboard('Choice hour from menu', hourKeyboard, 'dateKeyboard');
//   }
// });

// const ctxFor = new Statelessctx('ctx4', async (ctx) => {
//   await ctx.replyWithKeyboard('Choice date from menu', hourKeyboard, 'dateKeyboard');
// });

// const actionSelectSubmenu = new MenuTemplate<MyContext>(actionSelectText);

// const actionSelectSubmenu2 = new MenuTemplate<MyContext>(actionSelectText);
// actionSelectSubmenu.chooseIntoSubmenu('options2', () => Object.keys(options2), actionSelectSubmenu2, {
//   buttonText: optionsButtonText,
//   columns: 2,
// });

// actionSelectSubmenu.interact('Click an 🦄', 'randomButton', {
//   hide: () => mainMenuToggle,
//   do: async (ctx) => {
//     const text = 'What are unicorns doing?';
//     await ctx.reply(text);
//     return false;
//   },
// });
// actionSelectSubmenu.manualRow(createBackMainMenuButtons());

// // actionMenu.url('Our web site', 'https://ourwebsite.startup');
// // actionMenu.chooseIntoSubmenu('options', () => Object.keys(options), actionSelectSubmenu, {
// //   buttonText: optionsButtonText,
// //   columns: 2,
// // });
// // actionMenu.manualRow(createBackMainMenuButtons());

// // bot.command('rainbows', async (ctx) => {
// //   const text = 'What are unicorns doing?';
// //   return ctx.reply( text);
// // });

// // menu.submenu('Controls Menu', 'control', actionMenu, {
// //   hide: () => mainMenuToggle,
// // });

// const menuMiddleware = new MenuMiddleware<MyContext>('/', menu);
// console.log(menuMiddleware.tree());

// // bot.on('callback_query:data', async (next) => {
// //   console.log('another callbackQuery happened', ctx.callbackQuery.data.length, ctx.callbackQuery.data);
// //   if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 18) === 'Bots/options2:add/') {
// //     await ctx.reply('Type here your bot TOKEN...', 'botAdd');
// //   } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 19) === 'Bots/options2:edit/') {
// //     await ctx.reply('Type here your bot TOKEN...', 'botEdit');
// //   } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 19) === 'Bots/options2:show/') {
// //     const showAll = await showAllUserBotsFromDataBase(models.default.botModel);
// //     await ctx.reply(showAll, { reply_markup: { remove_keyboard: true } });
// //   } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 21) === 'Bots/options2:delete/') {
// //     await ctx.reply('Type here your bot name...', 'botDelete');
// //   } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 22) === 'Channels/options2:add/') {
// //     await ctx.reply('Type here your channel name...', 'channelAdd');
// //   } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 23) === 'Channels/options2:edit/') {
// //     await ctx.reply('Type here your channel name...', 'channelEdit');
// //   } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 23) === 'Channels/options2:show/') {
// //     const showAll = await showAllUserChannelsFromDataBase(models.default.channelModel);
// //     await ctx.reply(showAll, { reply_markup: { remove_keyboard: true } });
// //   } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 25) === 'Channels/options2:delete/') {
// //     await ctx.reply('Type here your channel name...', 'channelDelete');
// //   } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 22) === 'Schedule/options2:add/') {
// //     // await ctx.reply( 'Choice date from menu', 'dateKeyboard');
// //     // await ctx.replyWithKeyboard( 'Choice date from menu', dateKeyboard, 'dateKeyboard');
// //     // ctx.reply('What are unicorns doing?' + ctx.messageSuffixMarkdown(), {
// //     //   parse_mode: 'Markdown',
// //     //   reply_markup: { force_reply: true, keyboard: dateKeyboard.build() },
// //     // });
// //     // bot.api.sendMessage(ctx.chat.id, 'Choice *date* from menu', { reply_markup: dateKeyboard });
// //     // const date = await ctx.reply('Choice date from menu', { reply_markup: dateKeyboard });
// //     // const hour = await ctx.reply('Choice hours from menu', { reply_markup: hourKeyboard });
// //     // await ctx.reply('Choice minutes from menu', { reply_markup: minuteKeyboard });
// //     // await ctx.reply('Choice date from menu', { reply_markup: dateKeyboard });
// //   }
// //   return next();
// // });

// bot.command('start', async (ctx) => menuMiddleware.replyToContext(ctx));
// bot.use(menuMiddleware.middleware());
// // bot.use(ctx.middleware());
// // bot.use(ctxFor.middleware());

// bot.catch((error) => {
//   console.log('🌚 Bot error', error);
// });

// export default async function startBot() {
//   await bot.start({
//     onStart: (botInfo) => {
//       console.log(new Date(), 'Bot starts as', botInfo.username);
//     },
//   });
// }
