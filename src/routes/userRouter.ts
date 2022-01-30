import { Router } from 'express';
import UserController from '../controllers/userController';

const userRouter = Router();
userRouter.get('/get/:id', UserController.getUsers);
userRouter.post('/register', UserController.registerUser);
userRouter.put('/update/:id', UserController.updateUser);
userRouter.delete('/delete/:id', UserController.deleteUser);
export default userRouter;
