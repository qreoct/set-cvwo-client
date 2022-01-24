import { Tag } from './Tag.types';
import type { User } from './User.types';

export type Todo = {
	id: number;
	title: string;
	users: User[];
	deadline?: string;
	done: boolean;
	tags: Tag[];
	notes: string;
};