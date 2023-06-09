import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
    _id
    firstName
    lastName
    email
    programsCount
    programs {
      _id
      name
      phases {
        _id
        name
        workouts {
          _id
          name
        }
      }
    }
  }
}
`;

//  programs(id: ID!): Program
export const QUERY_PROGRAMS = gql`
  query getPrograms($progId: ID!) {
    programs(id: $progId) {
      _id
      name
      description
      image
      phasesCount
      phases {
        _id
      }
    }
  }
`;

//  phases(id: ID!): Phase
export const QUERY_PHASES = gql`
  query getPhases($phaseId: ID!) {
    phases(id: $phaseId) {
      _id
      name
      description
      position
      numberOfWeeks
      workoutsCount
      workouts {
        _id
      }
    }
  }
`;

//  workouts(id: ID!): Workout
export const QUERY_WORKOUTS = gql`
  query getWorkouts($workId: ID!) {
    workouts(id: $workId) {
      _id
      name
      description
      position
      secBtwnExs
      exercisesCount
      totalSetsCount
      exercises {
        _id
        name
        numSets
        goalReps
        goalWeight
        goalUnits
      }
    }
  }
`;

//  exercise(id: ID!): Exercise
export const QUERY_EXERCISES = gql`
  query getExercises($exerId: ID!) {
    exercise(id: $exerId) {
      _id
      name
      description
      image
      position
      goalReps
      goalWeight
      goalUnits
      numSets
      secBtwnSets
      exDatasCount
      exDatas {
        _id
        setNum
        reps
        weight
        units
        comment
        createdAt
      }
    }
  }
`;