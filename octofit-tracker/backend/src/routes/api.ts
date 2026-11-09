import { Router } from 'express';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models/index.js';

const apiRouter = Router();

apiRouter.get('/users', async (_request, response) => {
  response.json(await User.find().lean().exec());
});

apiRouter.get('/teams', async (_request, response) => {
  response.json(await Team.find().lean().exec());
});

apiRouter.get('/activities', async (_request, response) => {
  response.json(await Activity.find().lean().exec());
});

apiRouter.get('/leaderboard', async (_request, response) => {
  response.json(await LeaderboardEntry.find().lean().exec());
});

apiRouter.get('/workouts', async (_request, response) => {
  response.json(await Workout.find().lean().exec());
});

export default apiRouter;
