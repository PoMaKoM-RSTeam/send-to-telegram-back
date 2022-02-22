/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import ApiError from '../apiError/apiError';
import models from '../models/models';
import ChannelService from './channelService';
import userService from './userService';

class PostService {
  static async setPost(userId: number, channelId: number, date: Date, text: string) {
    if (!userId || !channelId || !date || !text) {
      throw ApiError.badRequest('Not enough data');
    }
    const user = await userService.findUser(userId);
    if (!user) {
      throw ApiError.unauthorized('User is not authorized yet');
    }
    const channel = await ChannelService.findChannel(channelId);
    if (!channel) {
      throw ApiError.badRequest('Such channel does not exist');
    }
    const userChannelRole = await models.usersChannelsRolesModel.findOne({
      userId: user._id,
      channelId: channel._id,
    });
    if (!userChannelRole) {
      throw ApiError.forbidden('User have no access to this channel');
    }
    const userRole = await models.roleModel.findById(userChannelRole.roleId);
    if (!userRole) {
      throw ApiError.badRequest('Role, your user have, does not exist');
    }
    if (!userRole.can_post_messages) {
      throw ApiError.forbidden('User have no access to post messages to this channel');
    }
    await models.postModel.create({
      id: Date.now(),
      userId: user._id,
      channelId: channel._id,
      date,
      text,
    });
    return { message: 'Post has been created succesfully' };
  }

  static async getPostsCalendar(weekNumber: number, channelId: number, userId: number) {
    if (weekNumber < 0) {
      throw ApiError.badRequest('Incorrect week value');
    }
    if (!channelId) {
      throw ApiError.badRequest('Please, indicate channel ID');
    }
    const user = await userService.findUser(userId);
    if (!user) {
      throw ApiError.unauthorized('User is not authorized yet');
    }
    const channel = await ChannelService.findChannel(channelId);
    if (!channel) {
      throw ApiError.badRequest('Such channel does not exist');
    }
    const userChannelRole = await models.usersChannelsRolesModel.findOne({
      userId: user._id,
      channelId: channel._id,
    });
    if (!userChannelRole) {
      throw ApiError.forbidden('User have no access to this channel');
    }
    const days = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 7 * weekNumber; i <= 7 * weekNumber + 6; i++) {
      // const day = new Date(`${moment().add(i, 'days')}`).getTime();
      days.push(moment().add(i, 'days'));
    }
    const calendar = await Promise.all(
      days.map(async (day) => ({
        date: day,
        posts: await models.postModel.find({
          date: { $gte: moment(day).startOf('day'), $lte: moment(day).endOf('day') },
          channelId: channel._id,
        }),
      }))
    );

    return calendar;
  }
}
export default PostService;
