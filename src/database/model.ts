export interface Equipment {
  _id: string;
  name: string;
}

export interface Muscle {
  _id: string;
  name: string;
}

export interface Exercise {
  _id: string;
  name: string;
  muscles: Array<Muscle>;
  equipment: Array<Equipment>;
}

export interface ESet {
  _id: string;
  weight: number;
  weight_unit: string;
  reps: number;
  rest: number;
  completed: boolean;
}

export interface Task {
  _id: string;
  exercise: Exercise;
  e_sets: Array<ESet>;
}

export interface Activity {
  _id: string;
  tasks: Array<Task>;
  reactions?: Array<string>;
  notes?: Array<string>;
  completed: boolean;
}

export interface Group {
  _id: string;
  name: string;
  activities: Array<Activity>;
}

export interface Workout {
  _id: string;
  name: string;
  groups: Array<Group>;
  reactions: Array<string>;
  notes: Array<string>;
  completed: boolean;
  isDraft: boolean;
  scheduleFor: Date;
}
