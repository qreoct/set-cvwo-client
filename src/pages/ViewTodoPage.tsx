import React from 'react';
import { useParams } from 'react-router';
import TodoView from '../components/EditableTodoView/TodoView';
import { useStateValue } from '../state';

const ViewTodoPage = () => {
	const {id} = useParams();
	const [{ todos }] = useStateValue();
	
	return (
		<div className='interactive-content'>

			<p className='typography--label'> Todo </p>
			{id && <TodoView todo={todos[parseInt(id)]} /> }
		</div>
	);
};

export default ViewTodoPage;