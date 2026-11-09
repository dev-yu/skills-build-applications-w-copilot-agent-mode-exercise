import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, jordan, alex] = await User.create([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        age: 29,
        fitnessGoal: 'Build endurance',
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        age: 34,
        fitnessGoal: 'Improve strength',
      },
      {
        name: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        age: 25,
        fitnessGoal: 'Run a 10K',
      },
    ]);

    const [trailBlazers, fitAndFurious] = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'A team focused on outdoor miles and steady progress.',
        members: [maya._id, jordan._id],
        challengePoints: 1850,
      },
      {
        name: 'Fit & Furious',
        description: 'A team mixing strength sessions with running goals.',
        members: [alex._id],
        challengePoints: 920,
      },
    ]);

    await User.updateOne({ _id: maya._id }, { team: trailBlazers._id });
    await User.updateOne({ _id: jordan._id }, { team: trailBlazers._id });
    await User.updateOne({ _id: alex._id }, { team: fitAndFurious._id });

    await Activity.create([
      {
        user: maya._id,
        type: 'Running',
        durationMinutes: 38,
        distanceKm: 6.2,
        calories: 410,
        completedAt: new Date('2026-11-07T08:30:00Z'),
      },
      {
        user: jordan._id,
        type: 'Strength training',
        durationMinutes: 45,
        calories: 320,
        completedAt: new Date('2026-11-07T17:00:00Z'),
      },
      {
        user: alex._id,
        type: 'Cycling',
        durationMinutes: 52,
        distanceKm: 18.5,
        calories: 510,
        completedAt: new Date('2026-11-08T09:15:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { user: maya._id, team: trailBlazers._id, points: 980, rank: 1 },
      { user: jordan._id, team: trailBlazers._id, points: 870, rank: 2 },
      { user: alex._id, team: fitAndFurious._id, points: 760, rank: 3 },
    ]);

    await Workout.create([
      {
        name: 'Easy Endurance Run',
        type: 'Running',
        description: 'A conversational-pace run with a short warm-up and cool-down.',
        durationMinutes: 35,
        difficulty: 'beginner',
        targetGoal: 'Build endurance',
      },
      {
        name: 'Full-Body Strength',
        type: 'Strength',
        description: 'A balanced circuit of bodyweight squats, push-ups, and rows.',
        durationMinutes: 40,
        difficulty: 'intermediate',
        targetGoal: 'Improve strength',
      },
      {
        name: 'Tempo Intervals',
        type: 'Running',
        description: 'Alternating tempo efforts and recovery jogs to build 10K pace.',
        durationMinutes: 30,
        difficulty: 'intermediate',
        targetGoal: 'Run a 10K',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
