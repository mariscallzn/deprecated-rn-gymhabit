import {openDB, TABLES} from '../../database/gymhabitDB';
import {v4 as uuid} from 'uuid';
import {logger} from '../../inf/logger';
import {uiWorkoutConverter} from '../../inf/dbConverters';

const TAG = 'REPO WORKOUT';

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
    const tmp = uiWorkoutConverter(dbWorkout);
    logger(`${TAG}:createWorkout`, tmp);
    return tmp;
  } catch (error) {
    logger(`${TAG}:createWorkout: ${error}`, null);
    throw error;
  }
}
