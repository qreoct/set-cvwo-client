import type { Task } from '../models/Task.types';

export type User = {
	id: number;
	username: string;
	display_name: string;
	user_role: string;
	is_admin: boolean;
	teams_owned: string[];
	teams_created: string[];
	tasks_created: Task[];
	tasks_assigned: Task[];
	pic_url: string;
};