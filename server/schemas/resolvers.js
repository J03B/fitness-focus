const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Program,
  Phase,
  Workout,
  Exercise,
  ExData,
} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // me Query to GET all logged in user's data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({
            path: "programs",
            model: "Program",
            populate: {
              path: "phases",
              model: "Phase",
              populate: {
                path: "workouts",
                model: "Workout",
              },
            },
          });

        return userData;
      }
      throw new AuthenticationError("Not logged in.");
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
      return Workout.findOne({ _id: args.id }).populate("exercises");
    },
    // exercise(id: ID!): Exercise
    exercise: async (parent, args, context, info) => {
      return Exercise.findOne({ _id: args.id }).populate("exDatas");
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const userWithProg = await defaultProgram(
        firstName,
        lastName,
        email,
        password
      );
      const token = signToken(userWithProg);
      return { token, userWithProg };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);

      return { token, user };
    },
    // addExData(setNum: Int!, reps: Int!, weight: Int!, units: String!, comment: String): ExData
    addExData: async (parent, args, context) => {
      const newExData = await ExData.create(args);
      const updatedExercise = await Exercise.findByIdAndUpdate(
        args.exerciseId,
        {
          $push: { exDatas: newExData._id },
        },
        {
          returnDocument: "after",
          setDefaultsOnInsert: true,
          upsert: true,
        }
      ).populate("exDatas");
      return updatedExercise;
    },
    // addExercise(name: String!, description: String, image: String, position: Int!, goalReps: Int!, goalWeight: Int!, goalUnits: String!, numSets: Int!, secBtwnSets: Int!): Exercise
    addExercise: async (parent, args) => {
      const newExercise = await Exercise.create(args);
      await Workout.findByIdAndUpdate(args.workoutId, {
        $push: { exercises: newExercise.id },
      });
      const parentPhaseId = await Phase.findOne({
        workouts: { _id: args.workoutId },
      });
      return parentPhaseId;
    },
    // addWorkout(name: String!, description: String, position: Int!, secBtwnExs: Int!, phaseId: ID!): Workout
    addWorkout: async (parent, args) => {
      const newWorkout = await Workout.create(args);
      await Phase.findByIdAndUpdate(args.phaseId, {
        $push: { workouts: newWorkout.id },
      });
      return newWorkout;
    },
    // addPhase(name: String!, description: String, position: Int!, numberOfWeeks: Int!, programId: ID!): Phase
    addPhase: async (parent, args, context) => {
      const newPhase = await Phase.create(args);
      await Program.findByIdAndUpdate(args.programId, {
        $push: { phases: newPhase.id },
      });
      return newPhase;
    },
    // addProgram(name: String!, description: String, image: String): Program
    addProgram: async (parent, args, context) => {
      if (context.user) {
        const newProgram = await Program.create(args);
        await User.findByIdAndUpdate(context.user._id, {
          $push: { programs: newProgram.id },
        });
        return newProgram;
      }
    },
    // updateGoals(_id: ID!, goalReps: Int!, goalWeight: Int!, goalUnits: String): Exercise
    updateGoals: async (
      parent,
      { _id, goalReps, goalWeight, goalUnits },
      context
    ) => {
      if (context.user) {
        return await Exercise.findByIdAndUpdate(
          _id,
          { goalReps, goalWeight, goalUnits },
          { new: true }
        );
      }
      throw new AuthenticationError("Not logged in");
    },
    // addExersData(_id: ID!, exDatas: [ExData]!): Exercise
    addExersData: async (parent, { _id, exDatas }, context) => {
      if (context.user) {
        return await Exercise.findByIdAndUpdate(_id, exDatas, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },
    // addWorkExers(_id: ID!, exercises: [ID]!): Workout
    addWorkExers: async (parent, { _id, exercises }, context) => {
      if (context.user) {
        return await Workout.findByIdAndUpdate(_id, exercises, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },
    // addPhaseWorks(_id: ID!, workouts: [ID]!): Phase
    addPhaseWorks: async (parent, { _id, workouts }, context) => {
      if (context.user) {
        return await Phase.findByIdAndUpdate(_id, workouts, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },
    // addProgPhases(_id: ID!, phases: [ID]!): Program
    addProgPhases: async (parent, { _id, phases }, context) => {
      if (context.user) {
        return await Program.findByIdAndUpdate(_id, phases, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

async function defaultProgram(firstName, lastName, email, password) {
  // Create Exercise Model Data
  const exercise = await Exercise.insertMany([
    // Moday 1
    {
      name: "Standing Barbell Press",
      description: "",
      image: "barbell-shoulder-press.jpg",
      position: 1,
      goalReps: 8,
      goalWeight: 120,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "Weighted Chin-ups",
      description: "",
      image: "chin-ups.jpg",
      position: 2,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "One Arm Overhead Tricep Extensions",
      description: "",
      image: "one-arm-overhead.jpg",
      position: 3,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "Leaning Lateral Raises",
      description: "",
      image: "leaning-lateral-raise.jpg",
      position: 4,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 5,
      secBtwnSets: 90,
    },

    // Wednesday 1
    {
      name: "Bulgarian Split Squats",
      description: "",
      image: "bulgarian-split-squat.jpg",
      position: 1,
      goalReps: 8,
      goalWeight: 120,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "Romanian Deadlifts",
      description: "",
      image: "romanian-deadlift.jpg",
      position: 2,
      goalReps: 8,
      goalWeight: 400,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 90,
    },
    {
      name: "Single Leg Hip Thrusts",
      description: "",
      image: "hip-thrust.jpg",
      position: 3,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "DB Leaning Shrugs",
      description: "",
      image: "leaning-shrug.jpg",
      position: 4,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 90,
    },

    // Friday 1
    {
      name: "Incline Bench Press",
      description: "",
      image: "incline-bench.jpg",
      position: 1,
      goalReps: 8,
      goalWeight: 360,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 90,
    },
    {
      name: "Pinned Hammer Bicep Curls",
      description: "",
      image: "pinned-curls.jpg",
      position: 2,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 90,
    },
    {
      name: "Bent Over Flys",
      description: "",
      image: "bent-over-flys.jpg",
      position: 3,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 5,
      secBtwnSets: 90,
    },
    {
      name: "Hanging Leg Raises",
      description: "",
      image: "hanging-leg-raise.jpg",
      position: 4,
      goalReps: 20,
      goalWeight: 0,
      goalUnits: "lbs",
      numSets: 5,
      secBtwnSets: 90,
    },

    // Moday 2
    {
      name: "DB Shoulder Press",
      description: "",
      image: "db-shoulder-press.jpg",
      position: 1,
      goalReps: 8,
      goalWeight: 70,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "Weighted Pull-ups/Sternum-ups",
      description: "Do two sets of pull ups, then two sets of sternum ups",
      image: "pull-up.jpg",
      position: 2,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 90,
    },
    {
      name: "Triceps Cable Pushdowns",
      description: "",
      image: "tricep-pushdown.jpg",
      position: 3,
      goalReps: 8,
      goalWeight: 60,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "Upright Rows",
      description: "",
      image: "upright-row.jpg",
      position: 4,
      goalReps: 12,
      goalWeight: 35,
      goalUnits: "lbs",
      numSets: 5,
      secBtwnSets: 90,
    },

    // Wednesday 2
    {
      name: "Machine Calf Raises",
      description: "",
      image: "machine-calf-raise.jpg",
      position: 1,
      goalReps: 12,
      goalWeight: 250,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 90,
    },
    {
      name: "Sumo Deadlifts",
      description: "",
      image: "sumo-deadlift.jpg",
      position: 2,
      goalReps: 6,
      goalWeight: 400,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 90,
    },
    {
      name: "Walking DB Lunges/Leg Curl Superset",
      description: "",
      image: "dumbbell-lunges.jpg",
      position: 3,
      goalReps: 12,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "One Arm Cable Shrugs",
      description: "",
      image: "leaning-shrug.jpg",
      position: 4,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 90,
    },

    // Friday 2
    {
      name: "Incline DB Press",
      description: "",
      image: "incline-dumbbell-bench.jpg",
      position: 1,
      goalReps: 8,
      goalWeight: 110,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "Weighted Dips",
      description: "",
      image: "weighted-dips.jpg",
      position: 2,
      goalReps: 8,
      goalWeight: 145,
      goalUnits: "lbs",
      numSets: 3,
      secBtwnSets: 90,
    },
    {
      name: "Incline Curls",
      description: "",
      image: "incline-dumbbell-curl.jpg",
      position: 3,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 5,
      secBtwnSets: 90,
    },
    {
      name: "Face Pulls/Hanging Knee Raises",
      description: "Super Set these - same reps",
      image: "hanging-leg-raise.jpg",
      position: 4,
      goalReps: 20,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 5,
      secBtwnSets: 90,
    },

    // Moday 3
    {
      name: "Barbell Shoulder Press",
      description: "",
      image: "barbell-shoulder-press.jpg",
      position: 1,
      goalReps: 8,
      goalWeight: 135,
      goalUnits: "lbs",
      numSets: 6,
      secBtwnSets: 60,
    },
    {
      name: "Weighted chin-ups",
      description: "",
      image: "chin-ups.jpg",
      position: 2,
      goalReps: 8,
      goalWeight: 65,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 60,
    },
    {
      name: "One Arm Cable Pushdowns",
      description: "",
      image: "tricep-pushdown.jpg",
      position: 3,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 60,
    },
    {
      name: "Incline Lateral Raise",
      description: "",
      image: "leaning-lateral-raise.jpg",
      position: 4,
      goalReps: 10,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 5,
      secBtwnSets: 30,
    },

    // Wednesday 3
    {
      name: "Calf Raises",
      description: "",
      image: "machine-calf-raise.jpg",
      position: 1,
      goalReps: 20,
      goalWeight: 200,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 60,
    },
    {
      name: "Bulgarian Split Squats",
      description: "",
      image: "bulgarian-split-squat.jpg",
      position: 2,
      goalReps: 10,
      goalWeight: 60,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 60,
    },
    {
      name: "Romanian Deadlifts",
      description: "",
      image: "romanian-deadlift.jpg",
      position: 3,
      goalReps: 10,
      goalWeight: 245,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 60,
    },
    {
      name: "Leg Extension/Curl/Shrug Ultra Set",
      description:
        "Super set Leg Extensions, leg curls, and DB Leaning Shrugs all back to back",
      image: "leg-extensions.jpg",
      position: 4,
      goalReps: 8,
      goalWeight: 245,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 60,
    },

    // Friday 3
    {
      name: "Incline/Flat Barbell Bench",
      description: "First do two sets of Incline, then two sets of Flat Back",
      image: "barbell-bench-press.jpg",
      position: 1,
      goalReps: 8,
      goalWeight: 380,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 60,
    },
    {
      name: "Concentration/Pinwheel Curls",
      description: "4 sets of each, alternating",
      image: "model-bicep-curls.jpg",
      position: 2,
      goalReps: 8,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 8,
      secBtwnSets: 30,
    },
    {
      name: "Incline Flys Cross Overs",
      description: "",
      image: "crossovers.jpg",
      position: 3,
      goalReps: 8,
      goalWeight: 65,
      goalUnits: "lbs",
      numSets: 4,
      secBtwnSets: 60,
    },
    {
      name: "Rear Delt Flys",
      description: "",
      image: "bent-over-flys.jpg",
      position: 4,
      goalReps: 10,
      goalWeight: 45,
      goalUnits: "lbs",
      numSets: 5,
      secBtwnSets: 30,
    },
  ]);

  // Create Workout Model Data
  const photoAttribution =
    "Some images by Freepik, prostooleh, sergeycauselove, senivpetro, bristekjegor, pressfoto, and fxquadro on Freepik.com";
  const workout = await Workout.insertMany([
    // Prog 1 - Phase 1
    {
      name: "Monday",
      description: `Focuses on shoulders, arms, and back.\n${photoAttribution}`,
      position: 1,
      secBtwnExs: 120,
      exercises: [
        exercise[0]._id,
        exercise[1]._id,
        exercise[2]._id,
        exercise[3]._id,
      ],
    },
    {
      name: "Wednesday",
      description: `Focuses on every part of the legs.\n${photoAttribution}`,
      position: 2,
      secBtwnExs: 120,
      exercises: [
        exercise[4]._id,
        exercise[5]._id,
        exercise[6]._id,
        exercise[7]._id,
      ],
    },
    {
      name: "Friday",
      description: `Focuses on the chest, biceps, and abs.\n${photoAttribution}`,
      position: 3,
      secBtwnExs: 120,
      exercises: [
        exercise[8]._id,
        exercise[9]._id,
        exercise[10]._id,
        exercise[11]._id,
      ],
    },

    // Prog 1 - Phase 2
    {
      name: "Monday",
      description: `Focuses on shoulders, arms, and back.\n${photoAttribution}`,
      position: 1,
      secBtwnExs: 120,
      exercises: [
        exercise[12]._id,
        exercise[13]._id,
        exercise[14]._id,
        exercise[15]._id,
      ],
    },
    {
      name: "Wednesday",
      description: `Focuses on every part of the legs.\n${photoAttribution}`,
      position: 2,
      secBtwnExs: 120,
      exercises: [
        exercise[16]._id,
        exercise[17]._id,
        exercise[18]._id,
        exercise[19]._id,
      ],
    },
    {
      name: "Friday",
      description: `Focuses on the chest, biceps, and abs.\n${photoAttribution}`,
      position: 3,
      secBtwnExs: 120,
      exercises: [
        exercise[20]._id,
        exercise[21]._id,
        exercise[22]._id,
        exercise[23]._id,
      ],
    },

    // Prog 1 - Phase 3
    {
      name: "Monday",
      description: `Focuses on shoulders, arms, and back.\n${photoAttribution}`,
      position: 1,
      secBtwnExs: 120,
      exercises: [
        exercise[24]._id,
        exercise[25]._id,
        exercise[26]._id,
        exercise[26]._id,
      ],
    },
    {
      name: "Wednesday",
      description: `Focuses on every part of the legs.\n${photoAttribution}`,
      position: 2,
      secBtwnExs: 120,
      exercises: [
        exercise[27]._id,
        exercise[28]._id,
        exercise[29]._id,
        exercise[30]._id,
      ],
    },
    {
      name: "Friday",
      description: `Focuses on the chest, biceps, and abs.\n${photoAttribution}`,
      position: 3,
      secBtwnExs: 120,
      exercises: [
        exercise[31]._id,
        exercise[32]._id,
        exercise[33]._id,
        exercise[34]._id,
      ],
    },
  ]);

  // Create Phase Model Data
  const phase = await Phase.insertMany([
    {
      name: "Bulk Phase",
      description: "This phase will pack on as much muscle as posible.",
      position: 1,
      numberOfWeeks: 4,
      workouts: [workout[0]._id, workout[1]._id, workout[2]._id],
    },
    {
      name: "Tone Phase",
      description:
        "This phase will focus on reps to build the definition your body needs.",
      position: 2,
      numberOfWeeks: 4,
      workouts: [workout[3]._id, workout[4]._id, workout[5]._id],
    },
    {
      name: "Shrink Wrap Phase",
      description:
        "This phase will act as a shrink wrap on your skin to make you look as chisled as possible.",
      position: 3,
      numberOfWeeks: 4,
      workouts: [workout[6]._id, workout[7]._id, workout[8]._id],
    },
  ]);

  // Create Program Model Data
  const program = await Program.insertMany([
    {
      name: "Lean Bulking 3000",
      description:
        "Designed to take you from a normal body to the body of a Greek God",
      image: "chest-day.jpg",
      phases: [phase[0]._id, phase[1]._id, phase[2]._id],
    },
  ]);

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    programs: [program[0]._id],
  });

  return user;
}

module.exports = resolvers;
