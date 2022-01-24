import axios from 'axios';
import { Todo } from '../models/Todo.types';
import { TodoResponse } from '../models/TodoResponse.types';
import { User } from '../models/User.types';
const baseUrl = '';

interface createProps {
	todo: Todo,
	currentUser: User
}

const create = async (props: createProps): Promise<TodoResponse> => {
	const res = axios.post(`${baseUrl}/todos`, { props })
		.then(response => response.data)
		.catch(error => console.error(error));
	return res;
};

const getTodos = async (): Promise<Todo[]> => {
	const res = axios.get(`${baseUrl}/todos`)
		.then(response => response.data)
		.catch(error => console.error(error));
	return res;
};

const updateTodo = async (id: number, todo: Todo): Promise<void> => {
	axios.put(`${baseUrl}/todos/${id}`, { todo })
		.then(response => response.data)
		.catch(error => console.error(error));
};

export default {
	create,
	getTodos,
	updateTodo
};