import {openDB, TABLES} from '../../database/gymhabitDB';
import {v4 as uuid} from 'uuid';
import {logger} from '../../inf/logger';

const TAG = 'REPO EXERCISE';

export async function createExercise(exercise) {
  try {
    const db = await openDB();
    const muscles = [];

    exercise.muscles.forEach(muscle => {
      const item = db.objectForPrimaryKey(TABLES.MUSCLE, muscle._id);
      muscles.push(item);
    });

    let result;
    db.write(() => {
      result = db.create(TABLES.EXERCISE, {
        name: exercise.name,
        _id: uuid(),
        muscles: muscles,
      });
    });
    const uiModel = uiExerciseModel(result);
    logger(`${TAG}:createExercise: uiModel`, uiModel);
    db.close();
    return uiModel;
  } catch (error) {
    logger(`${TAG}: ${error}`, null);
    throw error;
  }
}

export async function queryMuscles() {
  const db = await openDB();
  const result = db.objects(TABLES.MUSCLE);
  const uiModelList = uiMuscleConverter(result);
  db.close();
  return uiModelList;
}

/**
 * Transfrom database object to UiObject
 * @param {*} exercise Database object
 * @returns UiObject
 */
const uiExerciseModel = exercise => {
  return {
    id: exercise._id,
    name: exercise.name,
    muscles: exercise.muscles.map(i => {
      return {id: i._id, name: i.name};
    }),
  };
};

const uiMuscleConverter = muscles => {
  const uiModelList = [];
  muscles.forEach(element => {
    uiModelList.push({
      _id: element._id,
      name: element.name,
    });
  });
  return uiModelList;
};
