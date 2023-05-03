const mongoose = require('mongoose');

const { Schema } = mongoose;

const exDataSchema = new Schema(
    {
        setNum: {         // This is the position in the Exercise
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
    },
);

const ExData = mongoose.model('ExData', exDataSchema);

module.exports = ExData;
