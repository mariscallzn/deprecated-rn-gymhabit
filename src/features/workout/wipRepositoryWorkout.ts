import {openDB, TABLES} from '../../database/gymhabitDB';
import {v4 as uuid} from 'uuid';
import {UiExercise, UiWorkout} from '../uiModel';
import {uiWorkoutConverter} from '../../inf/dbConverters';
import {Activity, Exercise, Group, Task, Workout} from '../../database/model';

interface WorkoutRepository {
  createWorkout(workout: WorkoutPayload): Promise<UiWorkout>;
}

export interface WorkoutPayload {
  exercises: Array<UiExercise>;
  date: Date;
}

class WorkoutRepositoryIplm implements WorkoutRepository {
  createWorkout(workout: WorkoutPayload): Promise<UiWorkout> {
    return openDB().then(realm => {
      let dbWorkout: Workout | undefined;
      realm.write(() => {
        const dbActivities: Array<Activity> = [];

        workout.exercises.forEach(element => {
          const dbExercise = realm.objectForPrimaryKey<Exercise>(
            TABLES.EXERCISE,
            element.id,
          );

          if (dbExercise !== undefined) {
            const dbTask = realm.create<Task>(TABLES.TASK, {
              _id: uuid(),
              exercise: dbExercise,
              e_sets: [],
            });

            const dbActivity = realm.create<Activity>(TABLES.ACTIVITY, {
              _id: uuid(),
              tasks: [dbTask],
              reactions: [],
              notes: [],
              completed: false,
            });
            dbActivities.push(dbActivity);
          } else {
            throw new Error(`Exercise id ${element.id} does not exists on DB`);
          }
        });

        const dbGroup = realm.create<Group>(TABLES.GROUP, {
          _id: uuid(),
          name: '',
          activities: dbActivities,
        });

        dbWorkout = realm.create<Workout>(TABLES.WORKOUT, {
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

      if (dbWorkout !== undefined) {
        return uiWorkoutConverter(dbWorkout);
      } else {
        throw new Error('Workout could not be saved in database');
      }
    });
  }
}

export const workoutRepository: WorkoutRepository = new WorkoutRepositoryIplm();
