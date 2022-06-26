import Realm from 'realm';

export const TABLES = {
  //Grouping tables
  //Day -> Workouts -> Workout -> Groups -> Group -> Activities -> Activity -> Tasks -> Task
  DAY: 'Day',
  WORKOUT: 'Workout',
  GROUP: 'Group',
  ACTIVITY: 'Activity',
  TASK: 'Task',
  /**
   * Item tables
   * Task -> {Exercise, ESets, Notes}
   * - Exercise -> {Muscles & Equipment}
   * - - ESets -> ESet -> { Weight, Reps & Rest }
   */
  EXERCISE: 'Exercise',
  MUSCLE: 'Muscle',
  EQUIPMENT: 'Equipment',
  //Named like this to avoid conflicts with reserved words like "set"
  ESET: 'ESet',
};

//Schemas
const databaseSchema = [
  {
    name: TABLES.DAY,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      date: 'date',
      workouts: TABLES.WORKOUT + '[]',
    },
  },
  {
    name: TABLES.WORKOUT,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      name: 'string',
      groups: TABLES.GROUP + '[]',
      reactions: 'string[]',
      notes: 'string[]',
      completed: 'bool',
    },
  },
  {
    name: TABLES.GROUP,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      name: {type: 'string', default: ''},
      activities: TABLES.ACTIVITY + '[]',
    },
  },
  {
    name: TABLES.ACTIVITY,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      tasks: TABLES.TASK + '[]',
      reactions: 'string[]', //emojis
      notes: 'string[]',
      completed: {type: 'bool', default: false},
    },
  },
  {
    name: TABLES.TASK,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      exercise: TABLES.EXERCISE,
      e_sets: TABLES.ESET + '[]',
    },
  },
  {
    name: TABLES.ESET,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      // weight and weight unit could be an object and then have a list of that object
      // for example cardio could have [{w: 30, w_u: min, w: 5, w_u: km}] to measure time and distance
      // but this could be done in v2
      weight: 'float',
      weight_unit: 'string',
      //^----------------------^
      reps: 'int',
      rest: {type: 'int', default: 0}, //Express in sec
      completed: {type: 'bool', default: false},
    },
  },
  {
    name: TABLES.EXERCISE,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      name: 'string',
      muscles: TABLES.MUSCLE + '[]',
      equipment: TABLES.EQUIPMENT + '[]',
    },
  },
  {
    name: TABLES.MUSCLE,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      name: 'string',
      assignee: {
        type: 'linkingObjects',
        objectType: TABLES.EXERCISE,
        property: 'muscles',
      },
    },
  },
  {
    name: TABLES.EQUIPMENT,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      name: 'string',
      assignee: {
        type: 'linkingObjects',
        objectType: TABLES.EXERCISE,
        property: 'equipment',
      },
    },
  },
];

const dbConfig = {
  path: 'bundle.realm',
  schema: databaseSchema,
};

export async function openDB() {
  Realm.copyBundledRealmFiles();
  const realm = await Realm.open(dbConfig);
  return realm;
}

// export async function prepareBundle() {
//   try {
//     const realm = await Realm.open(dbConfig);
//     realm.write(() => {
//       //Chest Routine
//       const result = realm.create(TABLES.EXERCISE, {
//         _id: uuid(),
//         name: 'Dumbbell Bench Press',
//         muscles: [{name: 'Chest', _id: uuid()}],
//         equipment: [{name: 'Dumbbell', _id: uuid()}],
//       });

//       realm.create(TABLES.EXERCISE, {
//         _id: uuid(),
//         name: 'Incline dumbbell bench press',
//         muscles: [result.muscles[0]],
//         equipment: [result.equipment[0]],
//       });

//       realm.create(TABLES.EXERCISE, {
//         _id: uuid(),
//         name: 'Decline dumbbell bench press',
//         muscles: [result.muscles[0]],
//         equipment: [result.equipment[0]],
//       });

//       //--

//       const result2 = realm.create(TABLES.EXERCISE, {
//         _id: uuid(),
//         name: 'Incline barbell bench press',
//         muscles: [result.muscles[0]],
//         equipment: [{name: 'Barbell', _id: uuid()}],
//       });

//       realm.create(TABLES.EXERCISE, {
//         _id: uuid(),
//         name: 'Decline barbell bench press',
//         muscles: [result.muscles[0]],
//         equipment: [result2.equipment[0]],
//       });

//       realm.create(TABLES.EXERCISE, {
//         _id: uuid(),
//         name: 'Barbell bench press',
//         muscles: [result.muscles[0]],
//         equipment: [result2.equipment[0]],
//       });

//       // realm.create(TABLES.MUSCLE, {name: 'Chest', _id: uuid()});
//       realm.create(TABLES.MUSCLE, {name: 'Triceps', _id: uuid()});
//       realm.create(TABLES.MUSCLE, {name: 'Biceps', _id: uuid()});
//       realm.create(TABLES.MUSCLE, {name: 'Back', _id: uuid()});
//       realm.create(TABLES.MUSCLE, {name: 'Leg', _id: uuid()});
//       realm.create(TABLES.MUSCLE, {name: 'Abs', _id: uuid()});
//       realm.create(TABLES.MUSCLE, {name: 'None', _id: uuid()});

//       // realm.create(TABLES.EQUIPMENT, {name: 'Dumbbell', _id: uuid()});
//       // realm.create(TABLES.EQUIPMENT, {name: 'Barbell', _id: uuid()});
//       realm.create(TABLES.EQUIPMENT, {name: 'Machine', _id: uuid()});
//       realm.create(TABLES.EQUIPMENT, {name: 'Cable', _id: uuid()});
//       realm.create(TABLES.EQUIPMENT, {name: 'Disk', _id: uuid()});
//       realm.create(TABLES.EQUIPMENT, {name: 'None', _id: uuid()});
//     });
//   } catch (error) {
//     // logger(`Error DESAS ${error}`);
//   }
// }
