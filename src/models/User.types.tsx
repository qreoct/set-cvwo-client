import type { Todo } from '../models/Todo.types';

export type User = {
	id?: number;
	username?: string;
	name: string;
	user_role?: string;
	is_admin?: boolean;
	teams_owned?: string[];
	teams_created?: string[];
	todos_created?: Todo[];
	todos_assigned?: Todo[];
	pic_url?: string;
	created_at?: string;
	updated_at?: string;
};