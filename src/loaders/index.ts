import expressLoader from './express';
import mongooseLoader from './mongoose';
import botLoader from './bot';

export default async ({ expressApp }) => {
  // Mongo start
  await mongooseLoader();
  console.log('📅 MongoDB Initialized');
  // Express start
  try {
    await expressLoader({ app: expressApp });
    console.log('⏩ Express Initialized');
  } catch {
    console.error('⏩ Express Down!');
  }
  // Bot start
  try {
    await botLoader({ app: expressApp });
    console.log('🤖 Bot Initialized');
  } catch {
    console.error('🤖 Bot Down!');
  }
  console.log(`👆 All success. ${new Date(Number(new Date().getTime())).toISOString().slice(0, 19).replace('T', ' ')}`);
};
