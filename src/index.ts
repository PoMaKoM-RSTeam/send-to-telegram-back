// console.log('Hello world!');

import express, { Request, Response, Application } from 'express';
// import { Telegraf } from 'telegraf';

import crypto from 'crypto';

import mongoose from 'mongoose';
import Users from './models/users';

const TOKEN = '5005731009:AAHze4zcztCINm4cvTYnJFGxXAn8GXzoObE';
const app: Application = express();
const PORT = process.env.PORT || 80;
const userData = [];

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose
  .connect('mongodb+srv://Admin:vZ7vg35CC34dVFZ@users.d1obt.mongodb.net/Users', mongooseOptions)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello Typescript with Node.js!');
});

app.get('/login', (req: Request, res: Response): void => {
  res.sendFile('C:/Users/OK/Documents/GitHub/send-to-telegram-back/src/index.html');
});

app.get('/yes', async (req: Request, res: Response) => {
  const user = new Users({
    userid: req.query.id,
    first_name: req.query.first_name,
    username: req.query.username,
    auth_date: req.query.auth_date,
    hash: req.query.hash,
  });
  await user.save();

  userData.push(req.query);
  res.redirect('/data');

  // res.send(req.query);
  res.send(new Date(Number(req.query.auth_date) * 1000).toISOString().slice(0, 19).replace('T', ' '));

  const secret = crypto.createHash('sha256').update(TOKEN).digest();
  const checkString = `auth_date=${req.query.auth_date}\nfirst_name=${req.query.first_name}\nid=${req.query.id}\nusername=${req.query.username}`;
  const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
  console.log(hmac);
  // res.send(console.log(hmac === req.query.hash));
});

app.get('/data', async (req: Request, res: Response) => {
  const userrrs = await Users.find({});
  res.send(userrrs);
});

// const bot = new Telegraf(TOKEN);
// app.get('/hello', (req: Request, res: Response): void => {
//   bot.on('text', (ctx) => {
//     // Explicit usage
//     // ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

//     // Using context shortcut
//     ctx.reply(`Hello ${ctx.state.role}`);
//   });
// });

// bot.launch();

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://127.0.0.1:${PORT}`);
});

// const options = {
//   key: fs.readFileSync('./security/localhost.key'),
//   cert: fs.readFileSync('./security/localhost.cert'),
// };

// const handleRequest = (req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'text/html',
//   });
//   fs.readFile('./src/index.html', null, (error, data) => {
//     if (error) {
//       res.writeHead(404);
//       res.write('Whoops! File not found!');
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// https.createServer(options, handleRequest).listen(80, '127.0.0.1');
