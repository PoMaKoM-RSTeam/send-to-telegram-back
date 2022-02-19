import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu/dist/source';
import { MyContext } from '../types/context';
import { moderationMenu } from './moderationMenu';
import { postMenu } from './postMenu';
import { preferencesMenu } from './preferencesMenu';
import { scheduleMenu } from './scheduleMenu';
import { statsMenu } from './statsMenu';

export const actionMenuOptions = {
  post: { text: '✒️ Posts', submenu: postMenu },
  stats: { text: '📊 Stats', submenu: statsMenu },
  moderation: { text: '👥 Moderation', submenu: moderationMenu },
  preferences: { text: '⚙️ Preferences', submenu: preferencesMenu },
  schedule: { text: '📅 Schedule', submenu: scheduleMenu },
}; // настройки - отключить функцию отпаравки сообщений автоматически раз в 1-2 часа

export const actionMenu = new MenuTemplate<MyContext>((ctx) => {
  ctx.session.chanelId = Number(ctx.match[1]);
  return `You chose ${ctx.match[1]}`;
});

const menuMiddleware = new MenuMiddleware<MyContext>('/', actionMenu);
console.log(menuMiddleware.tree());

Object.keys(actionMenuOptions).forEach((option, index) => {
  actionMenu.submenu(actionMenuOptions[option].text, option, actionMenuOptions[option].submenu, {
    joinLastRow: !(index % 2),
  });
});

actionMenu.url('🌐 Our web site', 'https://example.com/');
actionMenu.manualRow(createBackMainMenuButtons());

export const actionMenuMiddleware = new MenuMiddleware<MyContext>('/', postMenu);
export const postMenuMiddleware = new MenuMiddleware<MyContext>('/', scheduleMenu);
