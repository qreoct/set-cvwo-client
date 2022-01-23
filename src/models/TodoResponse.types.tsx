import type { Todo } from './Todo.types';
import type { User } from './User.types';

export type TodoResponse = {
	status: number,
	todo?: Todo,
	errors?: [string]
};