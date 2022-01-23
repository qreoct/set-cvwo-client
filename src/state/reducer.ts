import { State } from './state';
import type { Todo } from '../models/Todo.types';
import type { User } from '../models/User.types';

export type Action =
// TODO
  | {
      type: 'ADD_TODO';
      payload: Todo;
    }
	| {
		type: 'FETCHING_TODOS';
	}
	| {
		type: 'SET_TODO_LIST';
		payload: Todo[];
	}
	| {
		type: 'UPDATE_TODO';
		payload: Todo;
	}
// USER
	| {
		type: 'SET_IS_LOGGED_IN';
		payload: boolean;
	}
	| {
			type: 'SET_CURRENT_USER';
			payload: User;
		}
	| {
			type: 'REMOVE_CURRENT_USER';
	}
// TEAM
	| {
		type: 'SET_TEAM';
		payload: User[]
	};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
	// TODO
	case 'ADD_TODO':
		console.log('a new todo has been added!!!' + JSON.stringify(action.payload));
		return {
			...state,
			todos: {
				...state.todos,
				[action.payload.id]: action.payload
			}
		};
	case 'UPDATE_TODO':
		return {
			...state,
			todos: {
				...state.todos,
				[action.payload.id]: action.payload
			}
		};
	case 'FETCHING_TODOS':
		return {
			...state,
			isLoading: true
		};
	case 'SET_TODO_LIST':
		return {
			...state,
			todos: {
				...action.payload.reduce(
					(memo, todo) => ({ ...memo, [todo.id]: todo }),
					{}
				),
				...state.todos
			},
			isLoading: false
		};
		
	// USER
	case 'SET_IS_LOGGED_IN':
		return {
			...state,
			isLoggedIn: action.payload
		};
	case 'SET_CURRENT_USER':
		console.log(action.payload);
		return {
			...state,
			currentUser: {
				id: action.payload.id,
				name: action.payload.name,
				username: action.payload.username
			}
		};
	case 'REMOVE_CURRENT_USER':
		return {
			...state,
			currentUser: null
		};
	// TEAM
	case 'SET_TEAM':
		return {
			...state,
			users: {
				...action.payload.reduce(
					(memo, user) => ({ ...memo, [user.id]: user }),
					{}
				),
				...state.users,
			}
		};
	default:
		return state;
	}
};