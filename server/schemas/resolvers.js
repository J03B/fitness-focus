const { AuthenticationError } = require('apollo-server-express');
const { User, Program, Phase, Workout, Exercise, ExData } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // me Query to GET all logged in user's data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User
        .findOne({ _id: context.user._id })
        .select('-__v -password')
        .populate({
          path: 'programs',
          model: 'Program',
          populate: {
            path: 'phases',
            model: 'Phase',
            populate: {
              path: 'workouts',
              model: 'Workout',
            }
          }
        });
        
        return userData;
      }
      throw new AuthenticationError('Not logged in.');
    },

    // programs(id: ID!): Program
    programs: async (parent, args, context, info) => {
      return Program.findOne({ _id: args.id });
    },
    // phases(id: ID!): Phase
    phases: async (parent, args, context, info) => {
      return Phase.findOne({ _id: args.id });
    },
    // workouts(id: ID!): Workout
    workouts: async (parent, args, context, info) => {
      return Workout.findOne({ _id: args.id });
    },
    // exercise(id: ID!): Exercise
    exercise: async (parent, args, context, info) => {
      return Exercise.findOne({ _id: args.id }).populate('exDatas');
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);

      return { token, user };
    },
    // addExData(setNum: Int!, reps: Int!, weight: Int!, units: String!, comment: String): ExData
    addExData: async (parent, args) => {
      const data = new ExData(args);
      return data;
    },
    // addExercise(name: String!, description: String, image: String, position: Int!, goalReps: Int!, goalWeight: Int!, goalUnits: String!, numSets: Int!, secBtwnSets: Int!): Exercise
    addExercise: async (parent, args) => {
      const data = new Exercise(args);
      return data;
    },
    // addWorkout(name: String!, description: String, position: Int!, secBtwnExs: Int!, phaseId: ID!): Workout
    addWorkout: async (parent, args) => {
      const newWorkout = await Workout.create(args);
      await Phase.findByIdAndUpdate(args.phaseId, { $push: { workouts: newWorkout.id } });
      return newWorkout;
    },
    // addPhase(name: String!, description: String, position: Int!, numberOfWeeks: Int!, programId: ID!): Phase
    addPhase: async (parent, args, context) => {
      const newPhase = await Phase.create(args);
      await Program.findByIdAndUpdate(args.programId, { $push: { phases: newPhase.id } });
      return newPhase;
    },
    // addProgram(name: String!, description: String, image: String): Program
    addProgram: async (parent, args, context) => {
      if (context.user) {
        const newProgram = await Program.create(args);
        await User.findByIdAndUpdate(context.user._id, { $push: { programs: newProgram.id } });
        return newProgram;
      }
    },
    // updateGoals(_id: ID!, goalReps: Int!, goalWeight: Int!, goalUnits: String): Exercise
    updateGoals: async (parent, { _id, goalReps, goalWeight, goalUnits }, context) => {
      if (context.user) {
        return await Exercise.findByIdAndUpdate(_id, { goalReps, goalWeight, goalUnits }, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    // addExersData(_id: ID!, exDatas: [ExData]!): Exercise
    addExersData: async (parent, { _id, exDatas }, context) => {
      if (context.user) {
        return await Exercise.findByIdAndUpdate(_id, exDatas, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    // addWorkExers(_id: ID!, exercises: [ID]!): Workout
    addWorkExers: async (parent, { _id, exercises }, context) => {
      if (context.user) {
        return await Workout.findByIdAndUpdate(_id, exercises, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    // addPhaseWorks(_id: ID!, workouts: [ID]!): Phase
    addPhaseWorks: async (parent, { _id, workouts }, context) => {
      if (context.user) {
        return await Phase.findByIdAndUpdate(_id, workouts, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    // addProgPhases(_id: ID!, phases: [ID]!): Program
    addProgPhases: async (parent, { _id, phases }, context) => {
      if (context.user) {
        return await Program.findByIdAndUpdate(_id, phases, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
