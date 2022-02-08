import { Context as DefaultContext, SessionFlavor } from 'grammy';
import { User } from '@grammyjs/types';

import { SessionData } from './session';

interface UserFlavor {
  user?: User;
}

export type MyContext = DefaultContext & SessionFlavor<SessionData> & UserFlavor;
