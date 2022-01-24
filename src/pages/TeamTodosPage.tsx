import React, { useEffect } from 'react';
import TodoCard from '../components/TodoCard/TodoCard';
import { useStateValue } from '../state';

import teamServices from '../services/team';

const TeamTodosPage = () => {
	const [{ todos, users }, dispatch] = useStateValue();

	useEffect(() => {
		const team = async () => {
			const users = await teamServices.getTeam();
			console.log('users are', users);
			dispatch({ type: 'SET_TEAM', payload: users});
		};
		team();
	}, [dispatch]);

	return (
		<div className='interactive-content'>
			<h1> Team Todos </h1>

			{Object.values(users).map(u => 
				<TodoCard key={u.id} sectionTitle={u.name} hasButton={false} contentDisplayType='todo'
					content={Object.values(todos).filter(t => !t.done)
						.filter(t => t.users.filter(user => user.id === u.id).length > 0)} />
			)}

		</div>
	);
};

export default TeamTodosPage;
