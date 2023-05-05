const { AuthenticationError } = require('apollo-server-express');
const { User, Program, Phase, Workout, Exercise, ExData } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // me Query to GET all logged in user's data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );
        return userData;
      }
      throw new AuthenticationError('Not logged in.');
    },

    // programs(id: ID!): Program
    programs: async (parent, args, context, info) => {
      return Program.find((prog) => prog._id === args._id);
    },
    // phases(id: ID!): Phase
    phases: async (parent, args, context, info) => {
      return Phase.find((prog) => prog._id === args._id);
    },
    // workouts(id: ID!): Workout
    workouts: async (parent, args, context, info) => {
      return Workout.find((prog) => prog._id === args._id);
    },
    // exercise(id: ID!): Exercise
    exercise: async (parent, args, context, info) => {
      return Exercise.find((prog) => prog._id === args._id);
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
    }
  }
};

module.exports = resolvers;
