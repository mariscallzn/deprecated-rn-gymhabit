import Realm from 'realm';
import {v4 as uuid} from 'uuid';
import {logger} from '../inf/logger';

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

/**
 * Initial set up for the database
 * - Pre-population of data
 */
export async function dbSetup() {
  Realm.copyBundledRealmFiles();
  const realm = await Realm.open(dbConfig);
  realm.close();
}

export async function select(table, filter, converter) {
  const realm = await Realm.open(dbConfig);
  const queryResult = realm.objects(table);
  logger(`DB: QueryResult from ${table}`, queryResult);
  if (filter != null) {
  }
  realm.close();
}

/**
 * Insert data to a specific table
 * @param {TABLES} table Table name from Schema
 * @param {object} object Object that will be save to the database
 * @param {function} converter converter that decouple db's objects to plain objects
 * @returns The inserted object converted by the "converter" function
 */
export async function create(table, object, converter) {
  const realm = await Realm.open(dbConfig);
  let result;
  realm.write(() => {
    result = realm.create(table, {...object, _id: uuid()});
  });
  const resultConverted = converter(result);
  logger(`DB: Item inserted on ${table}`, result);
  realm.close();
  logger(`DB: Converter ${converter}`, resultConverted);
  return resultConverted;
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
