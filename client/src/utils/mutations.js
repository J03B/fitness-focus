import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

// addExData(setNum: Int!, reps: Int!, weight: Int!, units: String!, comment: String): ExData
export const ADD_EXDATA = gql`
  mutation addExData(
    $setNum: Int!
    $reps: Int!
    $weight: Int!
    $units: String!
    $comment: String
  ) {
    addExData(
      setNum: $setNum
      reps: $reps
      weight: $weight
      units: $units
      comment: $comment
    ) {
        setNum
        reps
        weight
        units
        comment
    }
  }
`;
// addExercise(name: String!, description: String, image: String, position: Int!, goalReps: Int!, goalWeight: Int!, goalUnits: String!, numSets: Int!, secBtwnSets: Int!): Exercise
export const ADD_EXERCISE = gql`
  mutation addExercise(
    $name: String!
    $description: String
    $image: String
    $position: Int!
    $goalReps: Int!
    $goalWeight: Int!
    $goalUnits: String!
    $numSets: Int!
    $secBtwnSets: Int!
  ) {
    addExercise(
      name: $name
      description: $description
      image: $image
      position: $position
      goalReps: $goalReps
      goalWeight: $goalWeight
      goalUnits: $goalUnits
      numSets: $numSets
      secBtwnSets: $secBtwnSets
    ) {
        name
        description
        image
        position
        goalReps
        goalWeight
        goalUnits
        numSets
        secBtwnSets
    }
  }
`;
// addWorkout(name: String!, description: String, position: Int!, secBtwnExs: Int!): Workout
export const ADD_WORKOUT = gql`
  mutation addWorkout(
    $name: String!
    $description: String
    $position: Int!
    $secBtwnExs: Int!
    $phaseId: ID!
  ) {
    addWorkout(
      name: $name
      description: $description
      position: $position
      secBtwnExs: $secBtwnExs
      phaseId: $phaseId
    ) {
        name
        description
        position
        secBtwnExs
        phaseId
    }
  }
`;
// addPhase(name: String!, description: String, position: Int!, numberOfWeeks: Int!): Phase
export const ADD_PHASE = gql`
  mutation addPhase(
    $name: String!
    $description: String
    $position: Int!
    $numberOfWeeks: Int!
    $programId: ID!
  ) {
    addPhase(
      name: $name
      description: $description
      position: $position
      numberOfWeeks: $numberOfWeeks
      programId: $programId
    ) {
        name
        description
        position
        numberOfWeeks
        programId
    }
  }
`;
// addProgram(name: String!, description: String, image: String): Program
export const ADD_PROGRAM = gql`
  mutation addProgram(
    $name: String!
    $description: String
    $image: String
  ) {
    addProgram(
      name: $name
      description: $description
      image: $image
    ) {
        name
        description
        image
    }
  }
`;
// updateGoals(_id: ID!, goalReps: Int!, goalWeight: Int!, goalUnits: String): Exercise
export const UPDATE_GOALS = gql`
  mutation updateGoals(
    $_id: ID!
    $goalReps: Int!
    $goalWeight: Int!
    $goalUnits: String
  ) {
    updateGoals(
      _id: $_id
      goalReps: $goalReps
      goalWeight: $goalWeight
      goalUnits: $goalUnits
    ) {
        _id
        goalReps
        goalWeight
        goalUnits
    }
  }
`;
// addExersData(_id: ID!, exDatas: [ExData]!): Exercise
export const ADD_EXERCISE_DATA = gql`
  mutation addExersData(
    $_id: ID!
    $exDatas: [ExData]!
  ) {
    addExersData(
      _id: $_id
      exDatas: $exDatas
    ) {
        _id
        exDatas
    }
  }
`;
// addWorkExers(_id: ID!, exercises: [ID]!): Workout
export const ADD_WORKOUT_EXERCISES = gql`
  mutation addWorkExers(
    $_id: ID!
    $exercises: [ID]!
  ) {
    addWorkExers(
      _id: $_id
      exercises: $exercises
    ) {
        _id
        exercises
    }
  }
`;
// addPhaseWorks(_id: ID!, workouts: [ID]!): Phase
export const ADD_PHASE_WORKOUTS = gql`
  mutation addPhaseWorks(
    $_id: ID!
    $workouts: [ID]!
  ) {
    addPhaseWorks(
      _id: $_id
      workouts: $workouts
    ) {
        _id
        workouts
    }
  }
`;
// addProgPhases(_id: ID!, phases: [ID]!): Program
export const ADD_PROGRAM_PHASES = gql`
  mutation addProgPhases(
    $_id: ID!
    $phases: [ID]!
  ) {
    addProgPhases(
      _id: $_id
      phases: $phases
    ) {
        _id
        phases
    }
  }
`;