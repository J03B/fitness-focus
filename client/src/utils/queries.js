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
      description
      image
      phasesCount
      phases {
        _id
        name
        description
        position
        numberOfWeeks
        workoutsCount
        workouts {
          _id
          name
          description
          position
          secBtwnExs
          exercisesCount
          exercises {
            _id
            name
            description
            position
            goalReps
            goalWeight
            goalUnits
            numSets
            secBtwnSets
            exercisesCount
            exDatasCount
            exDatas {
              _id
              setNum
              reps
              weight
              units
            }
          }
        }
      }
    }
  }
}
`;