import type { User } from './User.types';

export type Todo = {
	id: number;
	todo_name: string;
	created_by: string;
	assigned_to: string[];
	deadline?: string;
	created_on: string;
	completed: boolean;
	tags: string[];
};