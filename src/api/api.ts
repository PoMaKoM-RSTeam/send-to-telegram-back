// TODO: ВЕРНУТЬ ЭТИ ПРАВИЛА НА МЕСТО!!!
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import express, { Request, Response } from 'express';
import * as models from '../models/models';
import { checkTelegramAnswer, saveUserToDataBase } from '../services/services';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    res.sendFile('index.html', { root: './src' });
  })
  .post(() => {});

router.route('/yes').get(async (req: Request, res: Response) => {
  if (checkTelegramAnswer(req)) {
    res.redirect('/no');
  }

  const user = saveUserToDataBase(req, models.default.userModel);
  await user.save();
  res.redirect('/data');
});

router.route('/no').get(async (req: Request, res: Response) => {
  res.send('NOOOOOOOOOOOOOOO!');
});

router
  .route('/user/:userid')
  .get((req: Request, res: Response) => {})
  .post((req: Request, res: Response) => {})
  .put((req: Request, res: Response) => {});

router
  .route('/chanell/:chanellid')
  .get((req: Request, res: Response) => {})
  .post((req: Request, res: Response) => {})
  .put((req: Request, res: Response) => {});

router
  .route('/bot/:botid')
  .get((req: Request, res: Response) => {})
  .post((req: Request, res: Response) => {})
  .put((req: Request, res: Response) => {});

router
  .route('/statistic/:chanellid')
  .get((req: Request, res: Response) => {})
  .post((req: Request, res: Response) => {})
  .put((req: Request, res: Response) => {});

export default router;
