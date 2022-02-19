import { NextFunction, Request, Response } from 'express';
import { IUserModel } from '../interfaces/modelsInterfaces';
import ChannelService from '../service/channelService';

class ChannelController {
  static async deleteChannel(req: Request, res: Response, next: NextFunction) {
    try {
      const channelId = req.params.id;
      const userData: IUserModel = JSON.parse(req.headers.userdata as string);
      const response = await ChannelService.deleteChannelDirectly(Number(channelId), userData.id);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async addChannelMember(req: Request, res: Response, next: NextFunction) {
    try {
      const { newMemberId, channelId, roleId } = req.body;
      const userData: IUserModel = JSON.parse(req.headers.userdata as string);
      const response = await ChannelService.addChannelMember(userData.id, channelId, newMemberId, roleId);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async editChannelMember(req: Request, res: Response, next: NextFunction) {
    try {
      const { newMemberId, channelId, roleId } = req.body;
      const userData: IUserModel = JSON.parse(req.headers.userdata as string);
      const response = await ChannelService.editChannelMember(userData.id, channelId, newMemberId, roleId);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteChannelMember(req: Request, res: Response, next: NextFunction) {
    try {
      const { newMemberId, channelId, roleId } = req.body;
      const userData: IUserModel = JSON.parse(req.headers.userdata as string);
      const response = await ChannelService.deleteChannelMember(userData.id, channelId, newMemberId, roleId);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }


  static async getMemberChannels(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: IUserModel = JSON.parse(req.headers.userdata as string);
      const response = await ChannelService.getMemberChannels(userData.id);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
}
export default ChannelController;
