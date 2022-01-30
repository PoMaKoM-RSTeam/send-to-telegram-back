// TODO: ВЕРНУТЬ ЭТИ ПРАВИЛА НА МЕСТО!!!
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
// import express, { Request, Response } from 'express';
// import Users from '../models/users';
// import { checkTelegramAnswer, saveUserToDataBase } from '../functions/functions';

// const router = express.Router();

// router
//   .route('/') // /api login
//   .get((req: Request, res: Response) => {
//     res.sendFile('index.html', { root: './src' });
//   })
//   .post(() => {});

// router.route('/yes').get(async (req: Request, res: Response) => {
//   checkTelegramAnswer(req);
//   if (!checkTelegramAnswer(req)) {
//     res.redirect('/no');
//   }
//   const user = saveUserToDataBase(req, Users);
//   await user.save();
//   res.redirect('/data');

//   // res.send(req.query);
//   // res
//   //   .send(new Date(Number(req.query.auth_date) * 1000)
//   //     .toISOString()
//   //     .slice(0, 19)
//   //     .replace('T', ' '));
// });

// router.route('/no').get(async (req: Request, res: Response) => {
//   res.send('NOOOOOOOOOOOOOOO!');
// });

// router
//   .route('/user/:userid')
//   .get((req: Request, res: Response) => {})
//   .post((req: Request, res: Response) => {})
//   .put((req: Request, res: Response) => {});

// router
//   .route('/chanell/:chanellid')
//   .get((req: Request, res: Response) => {})
//   .post((req: Request, res: Response) => {})
//   .put((req: Request, res: Response) => {});

// router
//   .route('/bot/:botid')
//   .get((req: Request, res: Response) => {})
//   .post((req: Request, res: Response) => {})
//   .put((req: Request, res: Response) => {});

// router
//   .route('/statistic/:chanellid')
//   .get((req: Request, res: Response) => {})
//   .post((req: Request, res: Response) => {})
//   .put((req: Request, res: Response) => {});

// export default router;
