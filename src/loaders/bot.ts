import { Bot, Context as BaseContext } from 'grammy';
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu';
import config from '../config/config';

const bot = new Bot(config.TOKEN);

type MyContext = BaseContext;

const menu = new MenuTemplate<MyContext>(() => `RS-CloneBot Controls Menu\n`);
const mainMenuToggle = false;
const actionMenu = new MenuTemplate<MyContext>('Сhoose your action...');

interface actionChoises {
  action?: string;
  tee?: boolean;
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

const action = ['add', 'show', 'edit', 'delete'];

function optionsButtonText(_: MyContext, key: string): string {
  const entry = options[key];
  if (entry?.action) {
    return key;
  }
  return key;
}

function actionSelectText(ctx: MyContext): string {
  const option = ctx.match![1]!;
  const yourChoice = options[option]!.action;
  if (!yourChoice) {
    return option;
  }

  return `You choose ${yourChoice} in ${option}`;
}

const actionSelectSubmenu = new MenuTemplate<MyContext>(actionSelectText);
actionSelectSubmenu.select('unique', action, {
  set: (ctx, key) => {
    const option = ctx.match![1]!;
    options[option]!.action = key;
    return true;
  },
  isSet: (ctx, key) => {
    const option = ctx.match![1]!;
    return options[option]!.action === key;
  },
});

actionSelectSubmenu.manualRow(createBackMainMenuButtons());

actionMenu.url('Our web site', 'https://ourwebsite.startup');

actionMenu.chooseIntoSubmenu('options', () => Object.keys(options), actionSelectSubmenu, {
  buttonText: optionsButtonText,
  columns: 2,
});
actionMenu.manualRow(createBackMainMenuButtons());

menu.submenu('Controls Menu', 'control', actionMenu, {
  hide: () => mainMenuToggle,
});

const menuMiddleware = new MenuMiddleware<MyContext>('/', menu);
console.log(menuMiddleware.tree());

bot.on('callback_query:data', async (ctx, next) => {
  console.log('another callbackQuery happened', ctx.callbackQuery.data.length, ctx.callbackQuery.data);
  return next();
});

bot.command('start', async (ctx) => menuMiddleware.replyToContext(ctx));
bot.use(menuMiddleware.middleware());

bot.catch((error) => {
  console.log('bot error', error);
});

export default async function startup() {
  await bot.start({
    onStart: (botInfo) => {
      console.log(new Date(), 'Bot starts as', botInfo.username);
    },
  });
}

startup();
