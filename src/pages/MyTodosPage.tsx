import React, { useEffect } from 'react';
import { useStateValue } from '../state/state';

import todoService from '../services/todos';
import type { Todo } from '../models/Todo.types';

import TodoCard from '../components/TodoCard/TodoCard';

const MyTodosPage = () => {

	const [{ todos, users, isLoading }, dispatch] = useStateValue();
	
	useEffect(() => {
		dispatch({ type: 'FETCHING_TODOS' });
		const getTodos = async () => {
			try {
				const res: Todo[] = await todoService.getTodos();
				dispatch({ type: 'SET_TODO_LIST', payload: res });
			} catch (e) {
				console.error(e);
			}
		};
		getTodos();
	}, [dispatch]);

	return (
		<div className='interactive-content'>
			{isLoading ?
				<p> loading </p>
				:
				<TodoCard sectionTitle='My Todos' hasButton={true} contentDisplayType='todo' content={Object.values(todos)}
					onSubmit={() => alert('submitted')} />
			}
		</div>
	);
};

export default MyTodosPage;
