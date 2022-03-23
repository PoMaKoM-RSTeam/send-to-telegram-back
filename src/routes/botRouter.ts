import { Router } from 'express';
import BotController from '../controllers/botController';

const botRouter = Router();
botRouter.get('/get/:id', BotController.getBots);
botRouter.post('/add', BotController.addBot);
botRouter.put('/update/:id', BotController.editBot);
botRouter.delete('/delete/:id', BotController.deleteBot);

export default botRouter;
