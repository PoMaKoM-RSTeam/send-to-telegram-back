import { MenuTemplate } from 'grammy-inline-menu/dist/source';
import { MyContext } from '../types/context';
import { actionMenu } from './actionMenu';

export const channelsMenu = new MenuTemplate<MyContext>(() => ({
  text: 'Select the channel you want to moderate from this list:',
  parse_mode: 'Markdown',
}));

const channelsMock = [
  {
    id: -321321657778893,
    name: 'Тестовый канал',
  },
  { id: -765165418777764, name: 'Суэцкий канал' },
];

function getButText(_: MyContext, id: string) {
  return channelsMock.find((ch) => ch.id === Number(id)).name;
}

function getChanId(channels) {
  return channels.map((ch) => ch.id);
}

channelsMenu.chooseIntoSubmenu('actions', () => getChanId(channelsMock), actionMenu, {
  buttonText: getButText,
  columns: 2,
});
