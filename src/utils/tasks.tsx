import type { Task } from '../models/Task.types';
import dummyTasks from './tasks.json';

const getTasks = async () => {
	try {
		const data: Task[] = dummyTasks.tasks;
		console.log('data is ' + data);
		return data;
	} catch (e) {
		console.error(e);
	}
};

export default {
	getTasks
};