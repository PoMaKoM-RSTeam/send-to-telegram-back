import { NextFunction, Request, Response } from 'express';
// import * as models from '../models/models';

class BotController {
  static getBots(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req, res, next);
      return res.json({ message: 'GET BOTS LINK' });
    } catch (e) {
      return console.log(e);
    }
  }

  static addBot(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req, res, next);
      return res.json({ message: 'ADD BOT LINK' });
    } catch (e) {
      return console.log(e);
    }
  }

  static async editBot(req: Request, res: Response, next: NextFunction) {
    try {
      // const editBot = await models.default.botModel.findOneAndUpdate(
      //   { user: req.query.user },
      //   {
      //     first_name: req.query.first_name,
      //     last_name: req.query.last_name,
      //     username: req.query.username,
      //     token: req.query.token,
      //     upsert: true,
      //     useFindAndModify: false,
      //   }
      // );
      console.log(req, res, next);
      return res.json({ message: 'EDIT BOT LINK' });
    } catch (e) {
      return console.log(e);
    }
  }

  static deleteBot(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req, res, next);
      return res.json({ message: 'DELETE BOT LINK' });
    } catch (e) {
      return console.log(e);
    }
  }
}
export default BotController;
