import { Bot, Context as BaseContext } from 'grammy';
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu';
import { StatelessQuestion } from '@grammyjs/stateless-question';
import {
  deleteBotFromDataBase,
  deleteChannelFromDataBase,
  editBotInDataBase,
  editChannelInDataBase,
  saveBotToDataBase,
  saveChannelToDataBase,
  showAllUserBotsFromDataBase,
  showAllUserChannelsFromDataBase,
} from '../../services/services';
import models from '../../models/models';
import { config } from '../../config/config';
import ChannelService from '../../service/channelService';

const bot = new Bot(config.BOT_TOKEN);
// TEST
bot.on('my_chat_member', async (ctx) => {
  try {
    await ChannelService.addChannel(ctx.update);
  } catch (e) {
    console.log(e);
  }
});
bot.catch((err) => {
  console.log(err);
});
// -----
type MyContext = BaseContext;

const menu = new MenuTemplate<MyContext>(() => `RS-CloneBot Controls Menu\n`);
const mainMenuToggle = false;
const actionMenu = new MenuTemplate<MyContext>('Сhoose your action...');

interface actionChoises {
  action?: string;
}

const options: Record<string, actionChoises> = {
  '🤖 Bots': {},
  '💻 Channels': {},
  '✒️ Posts': {},
  '📧 Messages': {},
  '👥 Users': {},
  '📅 Schedule': {},
  '📊 Stats': {},
  '⚙️ Preferences': {},
};

const options2: Record<string, actionChoises> = {
  add: {},
  show: {},
  edit: {},
  delete: {},
};

function optionsButtonText(_: MyContext, key: string): string {
  const entry = options[key];
  if (entry?.action) {
    return key;
  }
  return key;
}

function actionSelectText(ctx: MyContext): string {
  const option = ctx.match[1];
  const yourChoice = options[option].action;
  if (!yourChoice) {
    return option;
  }
  return `You choose ${yourChoice} in ${option}`;
}

const questionForChangeBotName = new StatelessQuestion('question2', async (ctx, additionalState) => {
  await editBotInDataBase(ctx, models.botModel, additionalState, ctx.message.text);
  await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
});
const questionForChangeChannelName = new StatelessQuestion('question3', async (ctx, additionalState) => {
  await editChannelInDataBase(ctx, models.channelModel, additionalState, ctx.message.text);
  await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
});

// async function ffff() {
//   const response = await fetch(
//     'https://api.telegram.org/bot5034764553:AAHkUrvWNHyYZPokRqmdaRSQ7Q5mIe70x9o/
//      sendMessage?chat_id=-1001717691638&text=test',
//     {
//       credentials: 'include',
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0',
//         Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
//         'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
//         'Upgrade-Insecure-Requests': '1',
//         'Sec-Fetch-Dest': 'document',
//         'Sec-Fetch-Mode': 'navigate',
//         'Sec-Fetch-Site': 'none',
//         'Sec-Fetch-User': '?1',
//       },
//       method: 'GET',
//       mode: 'cors',
//     }
//   );
//   if (response.ok) {
//     const json = await response.json();
//   } else {
//     alert(`Ошибка HTTP: ${response.status}`);
//   }
// }

const question = new StatelessQuestion('question', async (ctx, additionalState) => {
  // console.log(ctx.update.message.from.id);
  if (additionalState === 'botAdd') {
    const newwwbot = new Bot(ctx.message.text);
    console.log(await newwwbot.api.getMe());
    console.log(ctx.update.message.from.id);
    // newwwbot.drop();
    await saveBotToDataBase(ctx, models.botModel, ctx.message.text).save();
    await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
  } else if (additionalState === 'botEdit') {
    await questionForChangeBotName.replyWithMarkdown(ctx, 'Type here new bot TOKEN...', ctx.message.text);
  } else if (additionalState === 'botDelete') {
    await deleteBotFromDataBase(ctx, models.botModel, ctx.message.text);
    await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
  } else if (additionalState === 'channelAdd') {
    try {
      bot.api
        .getChat(`@${ctx.message.text}`)
        .then(async (channel) => saveChannelToDataBase(ctx, models.channelModel, channel).save());
    } catch (error) {
      console.log(error);
    }
    await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
  } else if (additionalState === 'channelEdit') {
    await questionForChangeChannelName.replyWithMarkdown(ctx, 'Type here new channel name...', ctx.message.text);
  } else if (additionalState === 'channelDelete') {
    await deleteChannelFromDataBase(ctx, models.channelModel, ctx.message.text);
    await ctx.reply('Done!', { reply_markup: { remove_keyboard: true } });
  }
});

const actionSelectSubmenu = new MenuTemplate<MyContext>(actionSelectText);

const actionSelectSubmenu2 = new MenuTemplate<MyContext>(actionSelectText); // подменю с actions для меню с категориями
actionSelectSubmenu.chooseIntoSubmenu('options2', () => Object.keys(options2), actionSelectSubmenu2, {
  buttonText: optionsButtonText,
  columns: 2,
});

// actionSelectSubmenu.interact('Click an 🦄', 'randomButton', {
//   hide: () => mainMenuToggle,
//   do: async (ctx) => {
//     const text = 'What are unicorns doing?';
//     await question.replyWithMarkdown(ctx, text);
//     return false;
//   },
// });
actionSelectSubmenu.manualRow(createBackMainMenuButtons());

actionMenu.url('Our web site', 'https://ourwebsite.startup');
actionMenu.chooseIntoSubmenu('options', () => Object.keys(options), actionSelectSubmenu, {
  buttonText: optionsButtonText,
  columns: 2,
});
actionMenu.manualRow(createBackMainMenuButtons());

// bot.command('rainbows', async (ctx) => {
//   const text = 'What are unicorns doing?';
//   return question.replyWithMarkdown(ctx, text);
// });

menu.submenu('Controls Menu', 'control', actionMenu, {
  hide: () => mainMenuToggle,
});

const menuMiddleware = new MenuMiddleware<MyContext>('/', menu);
console.log(menuMiddleware.tree());

bot.on('callback_query:data', async (ctx, next) => {
  console.log('another callbackQuery happened', ctx.callbackQuery.data.length, ctx.callbackQuery.data);
  if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 18) === 'Bots/options2:add/') {
    await question.replyWithMarkdown(ctx, 'Type here your bot TOKEN...', 'botAdd');
  } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 19) === 'Bots/options2:edit/') {
    await question.replyWithMarkdown(ctx, 'Type here your bot TOKEN...', 'botEdit');
  } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 19) === 'Bots/options2:show/') {
    const showAll = await showAllUserBotsFromDataBase(ctx, models.botModel);
    await ctx.reply(showAll, { reply_markup: { remove_keyboard: true } });
  } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 21) === 'Bots/options2:delete/') {
    await question.replyWithMarkdown(ctx, 'Type here your bot name...', 'botDelete');
  } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 22) === 'Channels/options2:add/') {
    await question.replyWithMarkdown(ctx, 'Type here your channel name...', 'channelAdd');
  } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 23) === 'Channels/options2:edit/') {
    await question.replyWithMarkdown(ctx, 'Type here your channel name...', 'channelEdit');
  } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 23) === 'Channels/options2:show/') {
    const showAll = await showAllUserChannelsFromDataBase(ctx, models.channelModel);
    await ctx.reply(showAll, { reply_markup: { remove_keyboard: true } });
  } else if (ctx.callbackQuery.data.slice(ctx.callbackQuery.data.length - 25) === 'Channels/options2:delete/') {
    await question.replyWithMarkdown(ctx, 'Type here your channel name...', 'channelDelete');
  }
  return next();
});

bot.command('start', async (ctx) => menuMiddleware.replyToContext(ctx));
bot.use(menuMiddleware.middleware());
bot.use(question.middleware());
bot.use(questionForChangeBotName.middleware());
bot.use(questionForChangeChannelName.middleware());

bot.catch((error) => {
  console.log('bot error', error);
});

export default bot;
