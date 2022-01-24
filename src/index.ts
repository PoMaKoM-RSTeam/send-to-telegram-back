import express from 'express';

import config from './config/config';
import loader from './loaders';

async function startServer() {
  const app = express();

  await loader({ expressApp: app });

  app.listen(config.PORT, (): void => {
    console.log(`Server Running here 👉 http://127.0.0.1:${config.PORT}`);
  });
}

startServer();
