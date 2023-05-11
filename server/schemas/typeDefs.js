const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    programsCount: Int
    programs: [Program]
  }

  type Program {
    _id: ID
    name: String
    description: String
    image: String
    phasesCount: Int
    phases: [Phase]
  }

  type Phase {
    _id: ID
    name: String
    description: String
    position: Int
    numberOfWeeks: Int
    workoutsCount: Int
    workouts: [Workout]
    programId: ID
  }

  type Workout {
    _id: ID
    name: String
    description: String
    position: Int
    secBtwnExs: Int
    exercisesCount: Int
    totalSetsCount: Int
    exercises: [Exercise]
  }

  type Exercise {
    _id: ID
    name: String
    description: String
    image: String
    position: Int
    goalReps: Int
    goalWeight: Int
    goalUnits: String
    numSets: Int
    secBtwnSets: Int
    exDatasCount: Int
    exDatas: [ExData]
  }

  type ExData {
    _id: ID
    setNum: Int
    reps: Int
    weight: Int
    units: String
    comment: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    programs(id: ID!): Program
    phases(id: ID!): Phase
    workouts(id: ID!): Workout
    exercise(id: ID!): Exercise
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addExData(setNum: Int!, reps: Int!, weight: Int!, units: String!, comment: String): ExData
    addExercise(name: String!, description: String, image: String, position: Int!, goalReps: Int!, goalWeight: Int!, goalUnits: String!, numSets: Int!, secBtwnSets: Int!): Exercise
    addWorkout(name: String!, description: String, position: Int!, secBtwnExs: Int!): Workout
    addPhase(name: String!, description: String, position: Int!, numberOfWeeks: Int!, programId: ID!): Phase
    addProgram(name: String!, description: String, image: String): Program
    updateGoals(_id: ID!, goalReps: Int!, goalWeight: Int!, goalUnits: String): Exercise
    addExersData(_id: ID!, exDatas: [ID]!): Exercise
    addWorkExers(_id: ID!, exercises: [ID]!): Workout
    addPhaseWorks(_id: ID!, workouts: [ID]!): Phase
    addProgPhases(_id: ID!, phases: [ID]!): Program
  }
`;

module.exports = typeDefs;
