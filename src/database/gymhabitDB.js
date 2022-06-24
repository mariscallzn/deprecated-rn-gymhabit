import Realm from 'realm';

export const TABLES = {
  EXERCISE: 'Exercise',
  MUSCLE: 'Muscle',
  EQUIPMENT: 'Equipment',
};

//Schemas
const databaseSchema = [
  {
    name: TABLES.EXERCISE,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      name: 'string',
      muscles: TABLES.MUSCLE + '[]',
      equipments: TABLES.EQUIPMENT + '[]',
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
        property: 'equipments',
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
//   const realm = await Realm.open(dbConfig);
//   realm.write(() => {
//     realm.create(TABLES.MUSCLE, {name: 'Chest', _id: uuid()});
//     realm.create(TABLES.MUSCLE, {name: 'Triceps', _id: uuid()});
//     realm.create(TABLES.MUSCLE, {name: 'Biceps', _id: uuid()});
//     realm.create(TABLES.MUSCLE, {name: 'Back', _id: uuid()});
//     realm.create(TABLES.MUSCLE, {name: 'Leg', _id: uuid()});
//     realm.create(TABLES.MUSCLE, {name: 'Abs', _id: uuid()});
//     realm.create(TABLES.MUSCLE, {name: 'None', _id: uuid()});

//     realm.create(TABLES.EQUIPMENT, {name: 'Dumbbell', _id: uuid()});
//     realm.create(TABLES.EQUIPMENT, {name: 'Barbell', _id: uuid()});
//     realm.create(TABLES.EQUIPMENT, {name: 'Machine', _id: uuid()});
//     realm.create(TABLES.EQUIPMENT, {name: 'Cable', _id: uuid()});
//     realm.create(TABLES.EQUIPMENT, {name: 'Disk', _id: uuid()});
//     realm.create(TABLES.EQUIPMENT, {name: 'None', _id: uuid()});
//   });
//   realm.close();
// }
