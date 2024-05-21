import express from 'express';
import cors from 'cors';

import config from './config.js';
import userRoutes from './routes/userRoute.js';
import gameRoutes from './routes/gamesRoute.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/user', userRoutes);
app.use('/api/games', gameRoutes);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.port}`),
);
console.log(config.hostUrl)