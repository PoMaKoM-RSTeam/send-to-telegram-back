import { session } from 'grammy';
import { FileAdapter } from '@satont/grammy-file-storage';
import { initialSessionData } from '../types/session';

export const middleware = () =>
  session({
    initial: () => initialSessionData,
    storage: new FileAdapter({
      dirName: 'filedb',
    }),
  });
