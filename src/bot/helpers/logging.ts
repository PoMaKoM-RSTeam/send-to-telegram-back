import { Chat, User } from '@grammyjs/types';
import { MyContext } from '../types/context';

interface LogMetadata {
  message_id: number | undefined;
  chat: Chat | undefined;
  peer: User | Chat | undefined;
}

export const getPeer = (ctx: MyContext): Chat | User | undefined => ctx.senderChat || ctx.from;

export const getMetadata = (ctx: MyContext): LogMetadata => ({
  message_id: ctx.msg?.message_id,
  chat: ctx.chat,
  peer: getPeer(ctx),
});
