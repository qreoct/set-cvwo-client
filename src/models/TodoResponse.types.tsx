import type { Todo } from './Todo.types';

export type TodoResponse = {
	status: number,
	todo?: Todo,
	errors?: [string]
};