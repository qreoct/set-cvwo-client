import axios, { AxiosResponse } from 'axios';
import { Todo } from '../models/Todo.types';
import { TodoResponse } from '../models/TodoResponse.types';
const baseUrl = '';

const getTodos = async (): Promise<Todo[]> => {
	const res = axios.get(`${baseUrl}/todos`)
		.then(response => response.data)
		.catch(error => console.error(error));
	return res;
};

const updateTodo = async (id: number, todo: Todo): Promise<void> => {
	const res = axios.put(`${baseUrl}/todos/${id}`, { todo })
		.then(response => response.data)
		.catch(error => console.error(error));
};

export default {
	getTodos,
	updateTodo
};