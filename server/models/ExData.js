const mongoose = require('mongoose');

// Format string - example: Apr 10, 2023, 1:31 PM
function formatDateTime(dateTime) {
  let formattedDateTime = dateTime.toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return formattedDateTime;
}

const { Schema } = mongoose;

const exDataSchema = new Schema(
  {
    setNum: {
      // This is the position in the Exercise
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    units: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: String,
      default: () => Date.now().toString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ExData = mongoose.model('ExData', exDataSchema);

module.exports = ExData;
