export const uiEquipmentConverter = equipment => {
  const uiModelList = [];
  equipment.forEach(element => {
    uiModelList.push({
      _id: element._id,
      name: element.name,
    });
  });
  return uiModelList;
};

export const uiMuscleConverter = muscles => {
  const uiModelList = [];
  muscles.forEach(element => {
    uiModelList.push({
      _id: element._id,
      name: element.name,
    });
  });
  return uiModelList;
};

export const uiExerciseConverter = exercise => {
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

export const uiExercisesConverter = exercises => {
  const uiModelList = [];
  exercises.forEach(element => {
    uiModelList.push(uiExerciseConverter(element));
  });
  return uiModelList;
};

export const uiESetConverter = eset => {
  return {
    id: eset._id,
    weight: eset.weight,
    weightUnit: eset.weight_unit,
    reps: eset.reps,
    rest: eset.rest,
    completed: eset.completed,
  };
};

export const uiTaskConverter = task => {
  return {
    id: task._id,
    exercise: uiExerciseConverter(task.exercise),
    eSets: convertList(task.e_sets, uiESetConverter),
  };
};

export const uiActivityConverter = activity => {
  return {
    id: activity._id,
    tasks: convertList(activity.tasks, uiTaskConverter),
    reactions: [],
    notes: [],
    completed: false,
  };
};

export const uiGroupConverter = group => {
  return {
    id: group._id,
    name: group.name,
    activities: convertList(group.activities, uiActivityConverter),
  };
};

export const uiWorkoutConverter = workout => {
  return {
    id: workout._id,
    name: workout.name,
    groups: convertList(workout.groups, uiGroupConverter),
    reactions: convertList(workout.reactions, convertNativeList),
    notes: convertList(workout.notes, convertNativeList),
    completed: workout.completed,
    isDraft: workout.isDraft,
    scheduleFor: JSON.stringify(workout.scheduleFor),
  };
};

//TODO Review if this actually works
const convertNativeList = nativeList => {
  const items = [];
  nativeList.forEach(element => {
    items.push(JSON.stringify(element));
  });
  return items;
};

export const convertList = (items, converter) => {
  const uiModelList = [];
  items.forEach(element => {
    uiModelList.push(converter(element));
  });
  return uiModelList;
};
