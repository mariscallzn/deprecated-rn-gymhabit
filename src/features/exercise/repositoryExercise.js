import {openDB, TABLES} from '../../database/gymhabitDB';
import {v4 as uuid} from 'uuid';
import {
  uiEquipmentConverter,
  uiExerciseConverter,
  convertList,
  uiMuscleConverter,
} from '../../inf/dbConverters';

export async function createExercise(exercise) {
  try {
    const db = await openDB();
    const muscles = [];
    const equipment = [];

    exercise.muscles.forEach(muscle => {
      const item = db.objectForPrimaryKey(TABLES.MUSCLE, muscle._id);
      muscles.push(item);
    });

    exercise.equipment.forEach(e => {
      const item = db.objectForPrimaryKey(TABLES.EQUIPMENT, e._id);
      equipment.push(item);
    });

    let result;
    db.write(() => {
      result = db.create(TABLES.EXERCISE, {
        name: exercise.name,
        _id: uuid(),
        muscles: muscles,
        equipment: equipment,
      });
    });
    const uiModel = uiExerciseConverter(result);

    return uiModel;
  } catch (error) {
    throw error;
  }
}

export async function queryExercises() {
  try {
    const db = await openDB();
    const result = db.objects(TABLES.EXERCISE);
    return convertList(result, uiExerciseConverter);
  } catch (error) {
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
    throw error;
  }
}

const uiCatalogConverter = (uiMusclesList, uiEquipmentList) => {
  return {
    muscles: uiMusclesList,
    equipment: uiEquipmentList,
  };
};
