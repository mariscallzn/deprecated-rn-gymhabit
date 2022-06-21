import {create, select, TABLES} from '../../database/gymhabitDB';

export async function createExercise(exercise) {
  const result = await create(TABLES.EXERCISE, exercise, uiConverter);
  return result;
}

export async function getExercises() {
  //TODO Change Table
  const result = await select(TABLES.MUSCLE, null, null);
  return result;
}

/**
 * Transfrom database object to UiObject
 * @param {*} exercise Database object
 * @returns UiObject
 */
const uiConverter = exercise => {
  return {
    name: exercise.name,
    id: exercise._id,
  };
};
