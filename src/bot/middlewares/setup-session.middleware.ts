import { session } from 'grammy';
import { FileAdapter } from '@satont/grammy-file-storage';
import { initialSessionData } from '../types/session';
import { MyContext } from '../types/context';

function getSessionKey(ctx: MyContext): string | undefined {
  return ctx.from?.id.toString();
}

export const middleware = () =>
  session({
    initial: () => initialSessionData,
    storage: new FileAdapter({
      dirName: 'filedb',
    }),
    getSessionKey,
  });
