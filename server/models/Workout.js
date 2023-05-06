const mongoose = require('mongoose');

const { Schema } = mongoose;

const Exercise = require('./Exercise');

const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String
    },
    position: {         // This is the position in the Phase
      type: Number,
      required: true,
    },
    secBtwnExs: {
      type: Number,
      required: true,
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
      }
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
workoutSchema.virtual('exercisesCount').get(function () {
  return this.exercises.length;
});

workoutSchema.virtual('totalSetsCount').get(function () {
  let totSets = 0;
  for (let i = 0; i < this.exercises.length - 1; i++) {
    const el = this.exercises[i];
    totSets += el.numSets;
  }
  return totSets;
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
