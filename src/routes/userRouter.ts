import { Router } from 'express';
import UserController from '../controllers/userController';

const userRouter = Router();
userRouter.post('/auth', UserController.checkUser);
userRouter.put('/update/:id', UserController.updateUser);
userRouter.delete('/delete/:id', UserController.deleteUser);
export default userRouter;
