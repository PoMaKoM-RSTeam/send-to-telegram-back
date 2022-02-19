import { Post } from '../types/post';

export function getInitialPostInstance(channel: number): Post {
  return {
    channel,
    attachments: [],
    text: { caption: '', caption_entities: [] },
  };
}
