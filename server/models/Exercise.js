const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExData = require('./ExData');

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String
    },
    image: {
      type: String,
    },
    position: {         // This is the position in the Phase
      type: Number,
      required: true,
    },
    goalReps: {
      type: Number,
      required: true,
    },
    goalWeight: {
      type: Number,
      required: true,
    },
    goalUnits: {
      type: String,
      required: true,
    },
    numSets: {
      type: Number,
      required: true,
    },
    secBtwnSets: {
      type: Number,
      required: true,
    },
    exDatas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ExData'
      }
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
exerciseSchema.virtual('exDatasCount').get(function () {
  return this.exDatas.length;
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
