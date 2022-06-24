import {openDB, TABLES} from '../../database/gymhabitDB';
import {v4 as uuid} from 'uuid';
import {logger} from '../../inf/logger';

const TAG = 'REPO EXERCISE';

export async function createExercise(exercise) {
  try {
    const db = await openDB();
    const muscles = [];
    const equipment = [];

    exercise.muscles.forEach(muscle => {
      const item = db.objectForPrimaryKey(TABLES.MUSCLE, muscle._id);
      muscles.push(item);
    });

    exercise.equipments.forEach(e => {
      const item = db.objectForPrimaryKey(TABLES.EQUIPMENT, e._id);
      equipment.push(item);
    });

    let result;
    db.write(() => {
      result = db.create(TABLES.EXERCISE, {
        name: exercise.name,
        _id: uuid(),
        muscles: muscles,
        //TODO Fix naming
        equipments: equipment,
      });
    });
    const uiModel = uiExerciseConverter(result);
    logger(`${TAG}:createExercise: uiModel`, uiModel);
    return uiModel;
  } catch (error) {
    logger(`${TAG}:createExercise: ${error}`, null);
    throw error;
  }
}

export async function queryExercises() {
  try {
    const db = await openDB();
    const result = db.objects(TABLES.EXERCISE);
    logger(`DB Exe: ${result[0].equipments[0].name}`);
    const tmp = uiExercisesConverter(result);
    logger('TMPO', tmp);
    return tmp;
  } catch (error) {
    logger(`${TAG}:queryExercises: ${error}`, null);
    throw error;
  }
}

export async function queryCatalog() {
  try {
    const db = await openDB();
    const rMuscles = db.objects(TABLES.MUSCLE);
    const rEquipment = db.objects(TABLES.EQUIPMENT);
    const uiMusclesList = uiMuscleConverter(rMuscles);
    const uiEquipmentList = uiEquipmentConverter(rEquipment);
    return uiCatalogConverter(uiMusclesList, uiEquipmentList);
  } catch (error) {
    logger(`${TAG}:createExercise: ${error}`, null);
    throw error;
  }
}

const uiCatalogConverter = (uiMusclesList, uiEquipmentList) => {
  return {
    muscles: uiMusclesList,
    equipment: uiEquipmentList,
  };
};

const uiExercisesConverter = exercises => {
  const uiModelList = [];
  exercises.forEach(element => {
    uiModelList.push(uiExerciseConverter(element));
  });
  return uiModelList;
};

/**
 * Transfrom database object to UiObject
 * @param {*} exercise Database object
 * @returns UiObject
 */
const uiExerciseConverter = exercise => {
  return {
    id: exercise._id,
    name: exercise.name,
    muscles: exercise.muscles.map(i => {
      return {id: i._id, name: i.name};
    }),
    equipment: exercise.equipments.map(i => {
      return {id: i._id, name: i.name};
    }),
  };
};

const uiEquipmentConverter = equipment => {
  const uiModelList = [];
  equipment.forEach(element => {
    uiModelList.push({
      _id: element._id,
      name: element.name,
    });
  });
  return uiModelList;
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
