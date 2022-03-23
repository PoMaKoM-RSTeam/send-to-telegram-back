import { Context as DefaultContext, SessionFlavor } from 'grammy';
import { User } from '@grammyjs/types';

import { I18nContextFlavor } from '@grammyjs/i18n/dist/source/context';
import { SessionData } from './session';

interface UserFlavor {
  user?: User;
}

export type MyContext = DefaultContext & SessionFlavor<SessionData> & UserFlavor & I18nContextFlavor;
