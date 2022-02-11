import { Router } from 'express';
import ChannelController from '../controllers/channelController';
import authMiddleware from '../middleware/authMiddleware';

const channelRouter = Router();
channelRouter.delete('/delete/:id', authMiddleware, ChannelController.deleteChannel);
channelRouter.post('/addmember', authMiddleware, ChannelController.addChannelMember);
export default channelRouter;
