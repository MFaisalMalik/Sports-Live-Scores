import express from 'express';
import cors from 'cors';

import config from './config.js';
import userRoutes from './routes/userRoute.js';
import gameRoutes from './routes/gamesRoute.js';
import blogRoutes from './routes/blogs.js';
import subscriptionRoutes from './routes/subscriptionRoute.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/user', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/subscription', subscriptionRoutes);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.port}`),
);