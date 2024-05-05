import express from 'express';
import cors from 'cors';

import config from './config.js';
import gameRoute from './routes/gamesRoute.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/games', gameRoute);


app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);