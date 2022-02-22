import { MessageEntity } from '@grammyjs/types/message';

export interface PostCaption {
  caption?: string;
  caption_entities?: MessageEntity[];
}

export interface AttachPhoto {
  type: 'photo';
  mediaId: string;
}
export interface AttachVideo {
  type: 'video';
  mediaId: string;
}
export interface AttachAnimation {
  type: 'animation';
  mediaId: string;
}
export interface AttachAudio {
  type: 'audio';
  mediaId: string;
}
export interface AttachDocument {
  type: 'document';
  mediaId: string;
}

export interface Post {
  id?: number;
  channel: number;
  date?: Date;
  text?: PostCaption;
  attachments?: Array<AttachPhoto | AttachVideo | AttachAnimation | AttachAudio | AttachDocument>;
  sendDate?: Array<string>;
  scheduleDateTime?: Date;
}
