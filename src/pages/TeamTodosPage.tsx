import React from 'react';
import TodoCard from '../components/TodoCard/TodoCard';
import { useStateValue } from '../state';

const TeamTodosPage = () => {
	const [{ todos, users, isLoading }, dispatch] = useStateValue();

	return (
		<div className='interactive-content'>
			<TodoCard sectionTitle='Team Todos' hasButton={false} contentDisplayType='todo' content={Object.values(todos)}
				onSubmit={() => alert('submitted')} />

			{Object.values(users).forEach(u => {
				<p> {u.name} </p>;
			})}
		</div>
	);
};

export default TeamTodosPage;
