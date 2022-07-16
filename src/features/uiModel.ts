export interface UiEquipment {
  id: string;
  name: string;
}

export interface UiMuscle {
  id: string;
  name: string;
}

export interface UiExercise {
  id: string;
  name: string;
  muscles: Array<UiMuscle>;
  equipment: Array<UiEquipment>;
}

export interface UiESet {
  id: string;
  weight: number;
  weightUnit: string;
  reps: number;
  rest: number;
  completed: boolean;
}
export interface UiTask {
  id: string;
  exercise: UiExercise;
  eSets: Array<UiESet>;
}
export interface UiActivity {
  id: string;
  tasks: Array<UiTask>;
  reactions: Array<string>;
  notes: Array<string>;
  completed: boolean;
}
export interface UiGroup {
  id: string;
  name: string;
  activities: Array<UiActivity>;
}
export interface UiWorkout {
  id: string;
  name: string;
  groups: Array<UiGroup>;
  reactions: Array<string>;
  notes: Array<string>;
  completed: boolean;
  isDraft: boolean;
  scheduleFor: string;
}
