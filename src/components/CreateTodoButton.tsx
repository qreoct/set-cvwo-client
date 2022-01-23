import React from 'react';
import { Plus } from 'react-feather';
import { Link } from 'react-router-dom';

const CreateTodoButton = () => {
	return (
		<Link to="/create" className='create-todo button shadow'>
			<div className='create-todo__icon-container'>
				<Plus />
			</div>
		</Link>
	);
}
;
export default CreateTodoButton;