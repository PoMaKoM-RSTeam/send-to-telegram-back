import { json, Request, Response, Application, urlencoded } from 'express';

import models from '../models/models';
import router from '../routes/index';
import errorMiddleware from '../middleware/errorMiddleware';

export default async ({ app }: { app: Application }) => {
  app.set('view engine', 'ejs');
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use('/api', router);
  app.use(errorMiddleware);

  app.get('/', (req: Request, res: Response): void => {
    res.send('Hello in RS-Clone application');
  });

  app.get('/data', async (req: Request, res: Response) => {
    const allUsers = await models.userModel.find({});
    res.send(allUsers);
  });

  return app;
};
