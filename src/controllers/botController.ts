import { NextFunction, Request, Response } from 'express';

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

  static editBot(req: Request, res: Response, next: NextFunction) {
    try {
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
