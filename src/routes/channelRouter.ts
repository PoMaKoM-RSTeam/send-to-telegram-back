import { Router } from 'express';
import ChannelController from '../controllers/channelController';
// import UserController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const channelRouter = Router();
channelRouter.get('/memberChannels', authMiddleware, ChannelController.getMemberChannels);
channelRouter.put('/editChannelMember', authMiddleware, ChannelController.editChannelMember);
channelRouter.delete('/deleteChannelMember', authMiddleware, ChannelController.deleteChannelMember);
channelRouter.delete('/delete/:id', authMiddleware, ChannelController.deleteChannel);
channelRouter.post('/addmember', authMiddleware, ChannelController.addChannelMember);
export default channelRouter;
