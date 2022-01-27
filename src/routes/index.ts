import { Router } from 'express';
import botRouter from './botRouter';
import channelRouter from './channelRouter';
import statisticsRouter from './statisticsRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/channel', channelRouter);
router.use('/bot', botRouter);
router.use('/statistics', statisticsRouter);
export default router;
