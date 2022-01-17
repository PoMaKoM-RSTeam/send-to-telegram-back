import express, { Request, Response, Application } from 'express';

import mongoose from 'mongoose';
import bot from './bot/bot';
import Users from './models/users';
import router from './routes/routes';
import TOKEN from './config/config';

const app: Application = express();
const PORT = process.env.PORT || 80;

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
app.use('/api', router);

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello in RS-Clone application');
});

app.get('/data', async (req: Request, res: Response) => {
  const allUsers = await Users.find({});
  res.send(allUsers);
});

const launchBot = async () => {
  await bot.launch();
};
launchBot();

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

export default TOKEN;
