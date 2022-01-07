import type { User } from '../models/User.types';

export type Task = {
	id: number;
	task_name: string;
	created_by: string;
	assigned_to: string[];
	deadline?: string;
	created_on: string;
	completed: boolean;
	tags: string[];
};