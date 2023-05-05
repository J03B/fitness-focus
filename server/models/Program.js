const mongoose = require('mongoose');

const { Schema } = mongoose;
const Phase = require('./Phase');

const programSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    phases: [Phase.schema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
programSchema.virtual('phasesCount').get(function () {
  return this.phases.length;
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
