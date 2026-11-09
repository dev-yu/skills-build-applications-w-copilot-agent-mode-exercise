import mongoose, { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 13 },
    fitnessGoal: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    challengePoints: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, min: 0, required: true },
    rank: { type: Number, min: 1, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    targetGoal: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.models.User ?? model('User', userSchema, 'users');
export const Team = mongoose.models.Team ?? model('Team', teamSchema, 'teams');
export const Activity =
  mongoose.models.Activity ?? model('Activity', activitySchema, 'activities');
export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ??
  model('LeaderboardEntry', leaderboardEntrySchema, 'leaderboard');
export const Workout = mongoose.models.Workout ?? model('Workout', workoutSchema, 'workouts');
