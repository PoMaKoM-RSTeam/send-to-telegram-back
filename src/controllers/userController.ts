import { NextFunction, Request, Response } from 'express';
import userService from '../service/userService';

class UserController {
  static getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, firstName, lastName, username, authDate, hash } = req.body;
      const response = await userService.registrateUser(id, firstName, lastName, username, authDate, hash);
      return res.json(response);
    } catch (e) {
      next(e);
      return console.log(e);
    }
  };

  static registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req, res, next);
      return res.json({ message: 'REGISTARTION LINK' });
    } catch (e) {
      return console.log(e);
    }
  };

  static updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req, res, next);
      return res.json({ message: 'UPDATE USER LINK' });
    } catch (e) {
      return console.log(e);
    }
  };

  static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req, res, next);
      return res.json({ message: 'DELETE USER LINK' });
    } catch (e) {
      return console.log(e);
    }
  };
}
export default UserController;
