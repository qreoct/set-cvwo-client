import React, { useEffect } from 'react';
import { useStateValue } from '../state/state';

import TodoUtils from '../utils/todos';
import type { Todo } from '../models/Todo.types';

import CreateTodoForm from '../components/CreateTodoForm';
import TodoCard from '../components/TodoCard';

const MyTodosPage = () => {

	const [{ todos, users, isLoading }, dispatch] = useStateValue();
	
	useEffect(() => {
		dispatch({ type: 'FETCHING_TODOS' });
		const getTodos = async () => {
			try {
				const res: Todo[] = await TodoUtils.getTodos() ?? [];
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
				<TodoCard sectionTitle='My Todos' hasButton={false} contentDisplayType='todo' content={Object.values(todos)}
					onSubmit={() => alert('submitted')} />
			}

			<hr />
			<CreateTodoForm />
		</div>
	);
};

export default MyTodosPage;
