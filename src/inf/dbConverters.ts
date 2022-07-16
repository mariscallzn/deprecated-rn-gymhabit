import {
  Activity,
  Equipment,
  ESet,
  Exercise,
  Group,
  Muscle,
  Task,
  Workout,
} from '../database/model';
import {
  UiActivity,
  UiEquipment,
  UiESet,
  UiExercise,
  UiGroup,
  UiMuscle,
  UiTask,
  UiWorkout,
} from '../features/uiModel';

export const uiEquipmentConverter = (equipment: Equipment): UiEquipment => {
  return {
    id: equipment._id,
    name: equipment.name,
  };
};

export const uiMuscleConverter = (muscle: Muscle): UiMuscle => {
  return {
    id: muscle._id,
    name: muscle.name,
  };
};

export const uiExerciseConverter = (exercise: Exercise): UiExercise => {
  return {
    id: exercise._id,
    name: exercise.name,
    muscles: exercise.muscles.map(i => {
      return {id: i._id, name: i.name};
    }),
    equipment: exercise.equipment.map(i => {
      return {id: i._id, name: i.name};
    }),
  };
};

export const uiExercisesConverter = (
  exercises: Array<Exercise>,
): Array<UiExercise> => {
  const uiModelList: Array<UiExercise> = [];
  exercises.forEach(element => {
    uiModelList.push(uiExerciseConverter(element));
  });
  return uiModelList;
};

export const uiESetConverter = (eset: ESet): UiESet => {
  return {
    id: eset._id,
    weight: eset.weight,
    weightUnit: eset.weight_unit,
    reps: eset.reps,
    rest: eset.rest,
    completed: eset.completed,
  };
};

export const uiTaskConverter = (task: Task): UiTask => {
  return {
    id: task._id,
    exercise: uiExerciseConverter(task.exercise),
    eSets: convertList(task.e_sets, uiESetConverter),
  };
};

export const uiActivityConverter = (activity: Activity): UiActivity => {
  return {
    id: activity._id,
    tasks: convertList(activity.tasks, uiTaskConverter),
    reactions: [],
    notes: [],
    completed: false,
  };
};

export const uiGroupConverter = (group: Group): UiGroup => {
  return {
    id: group._id,
    name: group.name,
    activities: convertList(group.activities, uiActivityConverter),
  };
};

export const uiWorkoutConverter = (workout: Workout): UiWorkout => {
  return {
    id: workout._id,
    name: workout.name,
    groups: convertList(workout.groups, uiGroupConverter),
    reactions: convertList(workout.reactions, removeRealmProxi),
    notes: convertList(workout.notes, removeRealmProxi),
    completed: workout.completed,
    isDraft: workout.isDraft,
    scheduleFor: workout.scheduleFor.toUTCString(), //TODO: Give specific format
  };
};

const removeRealmProxi = (proxy: string): string => proxy;

export const convertList = <I, O>(
  items: Array<I>,
  converter: (input: I) => O,
) => {
  const uiModelList: Array<O> = [];
  items.forEach(element => {
    uiModelList.push(converter(element));
  });
  return uiModelList;
};
