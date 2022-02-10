import expressLoader from './express';
import mongooseLoader from './mongoose';
import botLoader from './bot';

export default async ({ expressApp }) => {
  // Mongo start
  await mongooseLoader();
  console.log('📅 MongoDB Initialized');
  // Express start
  await expressLoader({ app: expressApp });
  console.log('⏩ Express Initialized');
  // Bot start
  botLoader().then(() => console.log('🤖 Bot Initialized'));
  console.log(`👆 All success. ${new Date(Number(new Date().getTime())).toISOString().slice(0, 19).replace('T', ' ')}`);
};
