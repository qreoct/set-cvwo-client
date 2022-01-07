import React, { createContext, useContext, useReducer } from 'react';
import { Task } from '../models/Task.types';
import { User } from '../models/User.types';

import { Action } from './reducer';

export type State = {
  tasks: { [id: number]: Task };
	users: { [id: number]: User };
	isLoading: boolean;
};

const initialState: State = {
	tasks: {},
	users: {},
	isLoading: false
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
	initialState,
	() => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
	reducer,
	children
}: StateProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider value={[state, dispatch]}>
			{children}
		</StateContext.Provider>
	);
};
export const useStateValue = () => useContext(StateContext);