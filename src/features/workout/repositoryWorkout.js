import {openDB, TABLES} from '../../database/gymhabitDB';
import {v4 as uuid} from 'uuid';
import {
  convertList,
  uiESetConverter,
  uiTaskConverter,
  uiWorkoutConverter,
} from '../../inf/dbConverters';

//The goal, to select which exercises to do today
//Add set per exercise

//1.Select exercises
//2.add sets per exercise
/**
 * How to translate 1 & 2?
 * - I have to create a "workout" that contains a single "group"
 * - I have to create a "Group" that contains a List of "Activities"
 * - I have to create a "Task" per "Activity"
 * - Each "Task" will be the combination of: A single "Exercise" with an empty list of "ESets"
 */
export async function createWorkout(workout) {
  try {
    const db = await openDB();
    const dbActivities = [];
    let dbWorkout;
    db.write(() => {
      workout.exercises.forEach(element => {
        const dbExercise = db.objectForPrimaryKey(TABLES.EXERCISE, element.id);
        const dbTask = db.create(TABLES.TASK, {
          _id: uuid(),
          exercise: dbExercise,
          e_sets: [],
        });
        const dbActivity = db.create(TABLES.ACTIVITY, {
          _id: uuid(),
          tasks: [dbTask],
          reactions: [],
          notes: [],
          completed: false,
        });
        dbActivities.push(dbActivity);
      });

      const dbGroup = db.create(TABLES.GROUP, {
        _id: uuid(),
        name: '',
        activities: dbActivities,
      });

      dbWorkout = db.create(TABLES.WORKOUT, {
        _id: uuid(),
        name: '',
        groups: [dbGroup],
        reactions: [],
        notes: [],
        completed: false,
        isDraft: true,
        scheduleFor: workout.date,
      });
    });
    return uiWorkoutConverter(dbWorkout);
  } catch (error) {
    throw error;
  }
}

export async function queryWorkoutByDate(date) {
  const db = await openDB();
  const date00 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
  );
  const date23 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
  );
  const dbWorkout = db
    .objects(TABLES.WORKOUT)
    .filtered('scheduleFor between {$0,$1}', date00, date23);
  const tmp = convertList(dbWorkout, uiWorkoutConverter);
  return tmp;
}

// export async function completeWorkoutById(id) {
//   const db = await openDB();
//   db.write(() => {
//     const dbWorkout = db.objectForPrimaryKey(TABLES.WORKOUT, id);
//     dbWorkout.completed = true;
//   });
//   return;
// }

/**
 *
 * @param {TABLES.TASK} task
 * @returns
 */
export async function updateTask(task) {
  try {
    const db = await openDB();
    let result;
    db.write(() => {
      const dbTask = db.objectForPrimaryKey(TABLES.TASK, task.id);
      const eSets = dbTask.e_sets;
      task.eSets.forEach(element => {
        if (element.id == null) {
          eSets.push({...element, _id: uuid()});
          dbTask.e_sets = eSets;
        } else if (element.delete) {
          let dbESet = db.objectForPrimaryKey(TABLES.ESET, element.id);
          db.delete(dbESet);
          dbESet = null;
        }
      });
      result = uiTaskConverter(dbTask);
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateESet(eSet) {
  const db = await openDB();
  let result;
  db.write(() => {
    const updatedResult = db.create(
      TABLES.ESET,
      {...eSet, _id: eSet.id, weight_unit: eSet.weightUnit},
      'modified',
    );
    result = uiESetConverter(updatedResult);
  });
  return result;
}
