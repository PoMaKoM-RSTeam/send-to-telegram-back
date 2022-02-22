import { NextFunction, Request, Response } from 'express';
import { IUserModel } from '../interfaces/modelsInterfaces';
import PostService from '../services/postService';

class PostController {
  static async setPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { channelId, date, text } = req.body;
      const userData: IUserModel = JSON.parse(req.headers.userdata as string);
      const response = await PostService.setPost(userData.id, channelId, date, text);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getPostsCalendar(req: Request, res: Response, next: NextFunction) {
    try {
      const week = Number(req.query.week) || 0;
      const channelId = Number(req.query.channel);
      const userData: IUserModel = JSON.parse(req.headers.userdata as string);
      const response = await PostService.getPostsCalendar(week, channelId, userData.id);
      return res.json({ message: response });
    } catch (e) {
      return next(e);
    }
  }
}
export default PostController;
