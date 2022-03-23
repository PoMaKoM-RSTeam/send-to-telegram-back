import { Post } from './post';

export interface SessionData {
  count: number;
  step: string;
  chanelId: number;
  postDraft: Post;
}

export const initialSessionData: SessionData = {
  count: 0,
  step: 'no_step',
  chanelId: 0,
  postDraft: null,
};
