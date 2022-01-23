import React, { useEffect, useState } from 'react';
import { useStateValue } from '../state/state';

import todoService from '../services/todos';
import type { Todo } from '../models/Todo.types';

import TodoCard from '../components/TodoCard/TodoCard';

const MyTodosPage = () => {

	const [{ todos, users, isLoading, currentUser }, dispatch] = useStateValue();
	const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
	
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
		console.log(JSON.stringify(Object.values(todos)));
	}, [dispatch]);

	useEffect(() => {
		if (currentUser) {
			const todosArray = Object.values(todos);
			const currentTodos = todosArray.filter(t => !t.done)
				.filter(t => t.users.filter(u => u.id == currentUser.id).length > 0 );
			setCurrentTodos(currentTodos);
		}
	}, [todos]);

	return (
		<div className='interactive-content'>
			{isLoading ?
				<p> loading </p>
				:
				<>
					<h1> My Todos </h1>
					<TodoCard sectionTitle='' hasButton={true} contentDisplayType='todo' content={currentTodos}
						emptyMessage='You have no todos... yet!'/>
				</ >
			}
		</div>
	);
};

export default MyTodosPage;
