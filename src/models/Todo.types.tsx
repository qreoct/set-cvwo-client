import { Tag } from './Tag.types';
import type { User } from './User.types';

export type Todo = {
	id: number;
	title: string;
	created_by: number;
	users: User[];
	deadline?: string;
	created_on: string;
	done: boolean;
	tags: Tag[];
	notes: string;
};