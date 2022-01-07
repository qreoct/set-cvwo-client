import { State } from './state';
import type { Task } from '../models/Task.types';
import type { User } from '../models/User.types';

export type Action =
  | {
      type: 'SET_TASK_LIST';
      payload: Task[];
    }
  | {
      type: 'ADD_TASK';
      payload: Task;
    }
	| {
			type: 'FETCHING_TASKS';
		};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
	case 'FETCHING_TASKS':
		return {
			...state,
			isLoading: true
		};
	case 'SET_TASK_LIST':
		return {
			...state,
			tasks: {
				...action.payload.reduce(
					(memo, task) => ({ ...memo, [task.id]: task }),
					{}
				),
				...state.tasks
			},
			isLoading: false
		};
	case 'ADD_TASK':
		console.log('a new task has been added!!!' + JSON.stringify(action.payload));
		return {
			...state,
			tasks: {
				...state.tasks,
				[action.payload.id]: action.payload
			}
		};
	default:
		return state;
	}
};