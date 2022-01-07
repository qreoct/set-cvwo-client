import React, { useEffect } from 'react';
import { useStateValue } from '../state/state';

import TaskUtils from '../utils/tasks';
import type { Task } from '../models/Task.types';

import CreateTaskForm from '../components/CreateTaskForm';
import TaskCard from '../components/TaskCard';

const MyTasksPage = () => {

	const [{ tasks, users, isLoading }, dispatch] = useStateValue();
	
	useEffect(() => {
		dispatch({ type: 'FETCHING_TASKS' });
		const getTasks = async () => {
			try {
				const res: Task[] = await TaskUtils.getTasks() ?? [];
				dispatch({ type: 'SET_TASK_LIST', payload: res });
			} catch (e) {
				console.error(e);
			}
		};
		getTasks();
	}, [dispatch]);

	return (
		<div className='content'>
			{isLoading ?
				<p> loading </p>
				:
				<TaskCard sectionTitle='My Tasks' hasButton={false} contentDisplayType='task' content={Object.values(tasks)}
					onSubmit={() => alert('submitted')} />
			}

			<hr />
			<CreateTaskForm />
		</div>
	);
};

export default MyTasksPage;
