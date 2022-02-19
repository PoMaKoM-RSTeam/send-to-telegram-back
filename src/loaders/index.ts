import expressLoader from './express';
import mongooseLoader from './mongoose';
import { start, getmes } from '../bot/features/statistics';
import botLoader from './bot';

export default async ({ expressApp }) => {
  // Mongo start
  await mongooseLoader();
  console.log('📅 MongoDB Initialized');
  // Express start
  await expressLoader({ app: expressApp });
  console.log('⏩ Express Initialized');
  // Bot start
  await botLoader();
  console.log('🤖 Bot Initialized');
  await start();
  await getmes();
  console.log(`👆 All success. ${new Date(Number(new Date().getTime())).toISOString().slice(0, 19).replace('T', ' ')}`);
};
