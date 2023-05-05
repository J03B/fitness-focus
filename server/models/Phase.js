const mongoose = require('mongoose');

const { Schema } = mongoose;
const Workout = require('./Workout');

const phaseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        position: {
            type: Number,
            required: true,
        },
        numberOfWeeks: {
            type: Number,
            required: true,
        },
        workouts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Workout'
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
phaseSchema.virtual('workoutsCount').get(function () {
    return this.workouts.length;
});

const Phase = mongoose.model('Phase', phaseSchema);

module.exports = Phase;
