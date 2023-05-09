const db = require('../config/connection');
const { User, Program, Phase, Workout, Exercise, ExData } = require('../models');

const exdataImport = require('./ExDatas.json');

db.once('open', async () => {
    try {
        await User.deleteOne(
            {
                email: "dodor@gmail.com"
            }
        );
        console.log("User dodor@gmail.com deleted");
    } catch(err) {
        console.error(err);
    }

    // Create the ExData Model Data
    const exdata = await ExData.insertMany(exdataImport);
    console.log("Exercise Data Loaded");

    // Create Exercise Model Data
    const exercise = await Exercise.insertMany([
        // Moday 1
        {
            name: 'Standing Barbell Press',
            description: '',
            image: 'barbell-shoulder-press.jpg',
            position: 1,
            goalReps: 8,
            goalWeight: 120,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[0], exdataImport[1], exdataImport[2], exdataImport[3]]
        },
        {
            name: 'Weighted Chin-ups',
            description: '',
            image: 'chin-ups.jpg',
            position: 2,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7]]
        },
        {
            name: 'One Arm Overhead Tricep Extensions',
            description: '',
            image: 'one-arm-overhead.jpg',
            position: 3,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[8], exdataImport[9], exdataImport[10], exdataImport[11]]
        },
        {
            name: 'Leaning Lateral Raises',
            description: '',
            image: 'leaning-lateral-raise.jpg',
            position: 4,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 5,
            secBtwnSets: 90,
            exdata: [exdataImport[12], exdataImport[13], exdataImport[14], exdataImport[15], exdataImport[16]]
        },

        // Wednesday 1
        {
            name: 'Bulgarian Split Squats',
            description: '',
            image: 'bulgarian-split-squat.jpg',
            position: 1,
            goalReps: 8,
            goalWeight: 120,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[0], exdataImport[1], exdataImport[2], exdataImport[3]]
        },
        {
            name: 'Romanian Deadlifts',
            description: '',
            image: 'romanian-deadlift.jpg',
            position: 2,
            goalReps: 8,
            goalWeight: 400,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 90,
            exdata: [exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7]]
        },
        {
            name: 'Single Leg Hip Thrusts',
            description: '',
            image: 'hip-thrust.jpg',
            position: 3,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[8], exdataImport[9], exdataImport[10], exdataImport[11]]
        },
        {
            name: 'DB Leaning Shrugs',
            description: '',
            image: 'leaning-shrug.jpg',
            position: 4,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 90,
            exdata: [exdataImport[12], exdataImport[13], exdataImport[14], exdataImport[15]]
        },

        // Friday 1
        {
            name: 'Incline Bench Press',
            description: '',
            image: 'incline-bench.jpg',
            position: 1,
            goalReps: 8,
            goalWeight: 360,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 90,
            exdata: [exdataImport[0], exdataImport[1], exdataImport[2], exdataImport[3]]
        },
        {
            name: 'Pinned Hammer Bicep Curls',
            description: '',
            image: 'pinned-curls.jpg',
            position: 2,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 90,
            exdata: [exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7]]
        },
        {
            name: 'Bent Over Flys',
            description: '',
            image: 'bent-over-flys.jpg',
            position: 3,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 5,
            secBtwnSets: 90,
            exdata: [exdataImport[8], exdataImport[9], exdataImport[10], exdataImport[11]]
        },
        {
            name: 'Hanging Leg Raises',
            description: '',
            image: 'hanging-leg-raise.jpg',
            position: 4,
            goalReps: 20,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 5,
            secBtwnSets: 90,
            exdata: [exdataImport[12], exdataImport[13], exdataImport[14], exdataImport[15], exdataImport[16]]
        },

        // Moday 2
        {
            name: 'DB Shoulder Press',
            description: '',
            image: 'db-shoulder-press.jpg',
            position: 1,
            goalReps: 8,
            goalWeight: 70,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[0], exdataImport[1], exdataImport[2], exdataImport[3]]
        },
        {
            name: 'Weighted Pull-ups/Sternum-ups',
            description: 'Do two sets of pull ups, then two sets of sternum ups',
            image: 'pull-up.jpg',
            position: 2,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 90,
            exdata: [exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7]]
        },
        {
            name: 'Triceps Cable Pushdowns',
            description: '',
            image: 'tricep-pushdown.jpg',
            position: 3,
            goalReps: 8,
            goalWeight: 60,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[8], exdataImport[9], exdataImport[10], exdataImport[11]]
        },
        {
            name: 'Upright Rows',
            description: '',
            image: 'upright-row.jpg',
            position: 4,
            goalReps: 12,
            goalWeight: 35,
            goalUnits: 'lbs',
            numSets: 5,
            secBtwnSets: 90,
            exdata: [exdataImport[12], exdataImport[13], exdataImport[14], exdataImport[15], exdataImport[16]]
        },

        // Wednesday 2
        {
            name: 'Machine Calf Raises',
            description: '',
            image: 'machine-calf-raise.jpg',
            position: 1,
            goalReps: 12,
            goalWeight: 250,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 90,
            exdata: [exdataImport[0], exdataImport[1], exdataImport[2], exdataImport[3]]
        },
        {
            name: 'Sumo Deadlifts',
            description: '',
            image: 'sumo-deadlift.jpg',
            position: 2,
            goalReps: 6,
            goalWeight: 400,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 90,
            exdata: [exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7]]
        },
        {
            name: 'Walking DB Lunges/Leg Curl Superset',
            description: '',
            image: 'dumbbell-lunges.jpg',
            position: 3,
            goalReps: 12,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[8], exdataImport[9], exdataImport[10], exdataImport[11]]
        },
        {
            name: 'One Arm Cable Shrugs',
            description: '',
            image: 'leaning-shrug.jpg',
            position: 4,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 90,
            exdata: [exdataImport[12], exdataImport[13], exdataImport[14], exdataImport[15]]
        },

        // Friday 2
        {
            name: 'Incline DB Press',
            description: '',
            image: 'incline-dumbbell-bench.jpg',
            position: 1,
            goalReps: 8,
            goalWeight: 110,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[0], exdataImport[1], exdataImport[2], exdataImport[3]]
        },
        {
            name: 'Weighted Dips',
            description: '',
            image: 'weighted-dips.jpg',
            position: 2,
            goalReps: 8,
            goalWeight: 145,
            goalUnits: 'lbs',
            numSets: 3,
            secBtwnSets: 90,
            exdata: [exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7]]
        },
        {
            name: 'Incline Curls',
            description: '',
            image: 'incline-dumbbell-curl.jpg',
            position: 3,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 5,
            secBtwnSets: 90,
            exdata: [exdataImport[8], exdataImport[9], exdataImport[10], exdataImport[11]]
        },
        {
            name: 'Face Pulls/Hanging Knee Raises',
            description: 'Super Set these - same reps',
            image: 'hanging-leg-raise.jpg',
            position: 4,
            goalReps: 20,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 5,
            secBtwnSets: 90,
            exdata: [exdataImport[12], exdataImport[13], exdataImport[14], exdataImport[15], exdataImport[16]]
        },

        // Moday 3
        {
            name: 'Barbell Shoulder Press',
            description: '',
            image: 'barbell-shoulder-press.jpg',
            position: 1,
            goalReps: 8,
            goalWeight: 135,
            goalUnits: 'lbs',
            numSets: 6,
            secBtwnSets: 60,
            exdata: [exdataImport[0], exdataImport[1], exdataImport[2], exdataImport[3]]
        },
        {
            name: 'Weighted chin-ups',
            description: '',
            image: 'chin-ups.jpg',
            position: 2,
            goalReps: 8,
            goalWeight: 65,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 60,
            exdata: [exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7]]
        },
        {
            name: 'One Arm Cable Pushdowns',
            description: '',
            image: 'tricep-pushdown.jpg',
            position: 3,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 60,
            exdata: [exdataImport[8], exdataImport[9], exdataImport[10], exdataImport[11]]
        },
        {
            name: 'Incline Lateral Raise',
            description: '',
            image: 'leaning-lateral-raise.jpg',
            position: 4,
            goalReps: 10,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 5,
            secBtwnSets: 30,
            exdata: [exdataImport[12], exdataImport[13], exdataImport[14], exdataImport[15], exdataImport[16]]
        },

        // Wednesday 3
        {
            name: 'Calf Raises',
            description: '',
            image: 'machine-calf-raise.jpg',
            position: 1,
            goalReps: 20,
            goalWeight: 200,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 60,
            exdata: [exdataImport[0], exdataImport[1], exdataImport[2], exdataImport[3]]
        },
        {
            name: 'Bulgarian Split Squats',
            description: '',
            image: 'bulgarian-split-squat.jpg',
            position: 2,
            goalReps: 10,
            goalWeight: 60,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 60,
            exdata: [exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7]]
        },
        {
            name: 'Romanian Deadlifts',
            description: '',
            image: 'romanian-deadlift.jpg',
            position: 3,
            goalReps: 10,
            goalWeight: 245,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 60,
            exdata: [exdataImport[8], exdataImport[9], exdataImport[10], exdataImport[11]]
        },
        {
            name: 'Leg Extension/Curl/Shrug Ultra Set',
            description: 'Super set Leg Extensions, leg curls, and DB Leaning Shrugs all back to back',
            image: 'leg-extensions.jpg',
            position: 4,
            goalReps: 8,
            goalWeight: 245,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 60,
            exdata: [exdataImport[12], exdataImport[13], exdataImport[14], exdataImport[15]]
        },

        // Friday 3
        {
            name: 'Incline/Flat Barbell Bench',
            description: 'First do two sets of Incline, then two sets of Flat Back',
            image: 'barbell-bench-press.jpg',
            position: 1,
            goalReps: 8,
            goalWeight: 380,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 60,
            exdata: [exdataImport[0], exdataImport[1], exdataImport[2], exdataImport[3]]
        },
        {
            name: 'Concentration/Pinwheel Curls',
            description: '4 sets of each, alternating',
            image: 'model-bicep-curls.jpg',
            position: 2,
            goalReps: 8,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 8,
            secBtwnSets: 30,
            exdata: [exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7], exdataImport[4], exdataImport[5], exdataImport[6], exdataImport[7]]
        },
        {
            name: 'Incline Flys Cross Overs',
            description: '',
            image: 'crossovers.jpg',
            position: 3,
            goalReps: 8,
            goalWeight: 65,
            goalUnits: 'lbs',
            numSets: 4,
            secBtwnSets: 60,
            exdata: [exdataImport[8], exdataImport[9], exdataImport[10], exdataImport[11]]
        },
        {
            name: 'Rear Delt Flys',
            description: '',
            image: 'bent-over-flys.jpg',
            position: 4,
            goalReps: 10,
            goalWeight: 45,
            goalUnits: 'lbs',
            numSets: 5,
            secBtwnSets: 30,
            exdata: [exdataImport[12], exdataImport[13], exdataImport[14], exdataImport[15], exdataImport[16]]
        },

        // 7 workouts for Program 2
        //'Chest and Back'
        {
            name: 'Standard Pushups',
            description: '',
            image: 'standard-pushup.jpg',
            position: 1,
            goalReps: 30,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Wide Front Pull Ups',
            description: '',
            image: 'pull-up.jpg',
            position: 2,
            goalReps: 16,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Military Push Ups',
            description: '',
            image: 'standard-pushup.jpg',
            position: 3,
            goalReps: 25,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Reverse Grip Chin Ups',
            description: '',
            image: 'chin-ups.jpg',
            position: 4,
            goalReps: 15,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Wide Fly Push Ups',
            description: 'hands wide apart',
            image: 'standard-pushup.jpg',
            position: 5,
            goalReps: 25,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Close Grip Overhand Pull Ups',
            description: 'Like a regular pull-up, but with your hands close together',
            image: 'pull-up.jpg',
            position: 6,
            goalReps: 15,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Decline Push Ups',
            description: 'legs on a stool or bench',
            image: 'standard-pushup.jpg',
            position: 7,
            goalReps: 25,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Leaning DB Rows',
            description: '',
            image: 'upright-row.jpg',
            position: 8,
            goalReps: 15,
            goalWeight: 50,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Diamond Push Ups',
            description: 'place your hands in a diamond/heart shape',
            image: 'standard-pushup.jpg',
            position: 9,
            goalReps: 20,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Lawnmower',
            description: 'bring your elbow farther out and higher than a row',
            image: 'standard-pushup.jpg',
            position: 10,
            goalReps: 20,
            goalWeight: 80,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Dive-Bomber Push Ups',
            description: 'starting from downward dog, going under the fence into upward dog',
            image: 'standard-pushup.jpg',
            position: 11,
            goalReps: 15,
            goalWeight: 0,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        {
            name: 'Back Flys',
            description: '',
            image: 'bent-over-flys.jpg',
            position: 3,
            goalReps: 12,
            goalWeight: 35,
            goalUnits: 'lbs',
            numSets: 1,
            secBtwnSets: 15,
            exdata: []
        },
        //'Jump Training'
        //'Shoulders and Arms'
        //'YYYoga'
        //'Legs and Back'
        //'Chest, Shoulders, and Triceps'
        //'Back and Biceps'
    ]);

    // Create Workout Model Data
    const photoAttribution = 'Some images by Freepik, prostooleh, sergeycauselove, senivpetro, bristekjegor, pressfoto, and fxquadro on Freepik.com'
    const workout = await Workout.insertMany([
        // Prog 1 - Phase 1
        {
            name: 'Monday',
            description: `Focuses on shoulders, arms, and back.\n${photoAttribution}`,
            position: 1,
            secBtwnExs: 120,
            exercises: [exercise[0]._id, exercise[1]._id, exercise[2]._id, exercise[3]._id]
        },
        {
            name: 'Wednesday',
            description: `Focuses on every part of the legs.\n${photoAttribution}`,
            position: 2,
            secBtwnExs: 120,
            exercises: [exercise[4]._id, exercise[5]._id, exercise[6]._id, exercise[7]._id]
        },
        {
            name: 'Friday',
            description: `Focuses on the chest, biceps, and abs.\n${photoAttribution}`,
            position: 3,
            secBtwnExs: 120,
            exercises: [exercise[8]._id, exercise[9]._id, exercise[10]._id, exercise[11]._id]
        },

        // Prog 1 - Phase 2
        {
            name: 'Monday',
            description: `Focuses on shoulders, arms, and back.\n${photoAttribution}`,
            position: 1,
            secBtwnExs: 120,
            exercises: [exercise[12]._id, exercise[13]._id, exercise[14]._id, exercise[15]._id]
        },
        {
            name: 'Wednesday',
            description: `Focuses on every part of the legs.\n${photoAttribution}`,
            position: 2,
            secBtwnExs: 120,
            exercises: [exercise[16]._id, exercise[17]._id, exercise[18]._id, exercise[19]._id]
        },
        {
            name: 'Friday',
            description: `Focuses on the chest, biceps, and abs.\n${photoAttribution}`,
            position: 3,
            secBtwnExs: 120,
            exercises: [exercise[20]._id, exercise[21]._id, exercise[22]._id, exercise[23]._id]
        },

        // Prog 1 - Phase 3
        {
            name: 'Monday',
            description: `Focuses on shoulders, arms, and back.\n${photoAttribution}`,
            position: 1,
            secBtwnExs: 120,
            exercises: [exercise[24]._id, exercise[25]._id, exercise[26]._id, exercise[26]._id]
        },
        {
            name: 'Wednesday',
            description: `Focuses on every part of the legs.\n${photoAttribution}`,
            position: 2,
            secBtwnExs: 120,
            exercises: [exercise[27]._id, exercise[28]._id, exercise[29]._id, exercise[30]._id]
        },
        {
            name: 'Friday',
            description: `Focuses on the chest, biceps, and abs.\n${photoAttribution}`,
            position: 3,
            secBtwnExs: 120,
            exercises: [exercise[31]._id, exercise[32]._id, exercise[33]._id, exercise[34]._id]
        },

        // Prog 2 -- All Workouts
        {
            name: 'Chest and Back',
            description: 'Intense workouts to maximize pushups and pullups.',
            position: 1,
            secBtwnExs: 120,
            exercises: [exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id, exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id]
        },
        {
            name: 'Jump Training',
            description: 'Focuses on athletisism. Tip of the day: Land like a cat.',
            position: 2,
            secBtwnExs: 120,
            exercises: [exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id, exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id]
        },
        {
            name: 'Shoulders and Arms',
            description: 'Super sets of shoulders, biceps, triceps. Tip of the day: Breathe',
            position: 3,
            secBtwnExs: 120,
            exercises: [exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id, exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id]
        },
        {
            name: 'YYYoga',
            description: 'If you think Yoga is easy, think again.',
            position: 4,
            secBtwnExs: 120,
            exercises: [exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id, exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id]
        },
        {
            name: 'Legs and Back',
            description: 'Ever thought of working out legs and back in the same workout? You can thank us later.',
            position: 5,
            secBtwnExs: 120,
            exercises: [exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id, exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id]
        },
        {
            name: 'Chest, Shoulders, and Triceps',
            description: 'If you think Yoga is easy, think again.',
            position: 1,
            secBtwnExs: 120,
            exercises: [exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id, exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id]
        },
        {
            name: 'Back and Biceps',
            description: 'Ever thought of working out legs and back in the same workout? You can thank us later.',
            position: 3,
            secBtwnExs: 120,
            exercises: [exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id, exercise[35]._id, exercise[36]._id, exercise[37]._id, exercise[38]._id, exercise[39]._id, exercise[40]._id, exercise[41]._id, exercise[42]._id, exercise[43]._id, exercise[44]._id, exercise[45]._id, exercise[46]._id]
        }
    ]);

    // Create Phase Model Data
    const phase = await Phase.insertMany([
        {
            name: 'Bulk Phase',
            description: 'This phase will pack on as much muscle as posible.',
            position: 1,
            numberOfWeeks: 4,
            workouts: [workout[0]._id, workout[1]._id, workout[2]._id]
        },
        {
            name: 'Tone Phase',
            description: 'This phase will focus on reps to build the definition your body needs.',
            position: 2,
            numberOfWeeks: 4,
            workouts: [workout[3]._id, workout[4]._id, workout[5]._id]
        },
        {
            name: 'Shrink Wrap Phase',
            description: 'This phase will act as a shrink wrap on your skin to make you look as chisled as possible.',
            position: 3,
            numberOfWeeks: 4,
            workouts: [workout[6]._id, workout[7]._id, workout[8]._id]
        },
        {
            name: 'Phase 1',
            description: 'Focusing on conditioning to get your mind and body ready.',
            position: 1,
            numberOfWeeks: 4,
            workouts: [workout[9]._id, workout[10]._id, workout[11]._id, workout[12]._id, workout[13]._id]
        },
        {
            name: 'Phase 2',
            description: 'This phase will challenge you to dig deep and go the extra mile.',
            position: 2,
            numberOfWeeks: 4,
            workouts: [workout[14]._id, workout[10]._id, workout[15]._id, workout[12]._id, workout[13]._id]
        },
        {
            name: 'Phase 3',
            description: 'This phase is designed to give you the best end results posible',
            position: 3,
            numberOfWeeks: 4,
            workouts: [workout[9]._id, workout[10]._id, workout[15]._id, workout[12]._id, workout[13]._id]
        }
    ]);

    // Create Program Model Data
    const program = await Program.insertMany([
        {
            name: 'Lean Bulking 3000',
            description: 'Designed to take you from a normal body to the body of a Greek God',
            image: 'chest-day.jpg',
            phases: [phase[0]._id, phase[1]._id, phase[2]._id]
        },
        {
            name: '13 Week Xtra Chiseled',
            description: 'A combination of some of the most insane, X-like workouts out there',
            image: 'model-bicep-curls.jpg',
            phases: [phase[3]._id, phase[4]._id, phase[5]._id]
        }
    ]);

    // Create User Model Data
    const user = await User.create({
        firstName: 'Duke',
        lastName: 'Seededuser',
        email: 'dodor@gmail.com',
        password: 'password123',
        programs: [program[0]._id, program[1]._id]
    });

    console.log('User seeded. Please log in with dodor@gmail.com');

    process.exit();
});
