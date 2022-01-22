import type { Todo } from '../models/Todo.types';
import dummyTodos from './todos.json';

const getTodos = async () => {
	try {
		const data: Todo[] = dummyTodos.todos;
		console.log('data is ' + data);
		return data;
	} catch (e) {
		console.error(e);
	}
};

export default {
	getTodos
};