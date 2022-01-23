import React, { useState } from 'react';
import { Todo } from '../../models/Todo.types';
import { User } from '../../models/User.types';
import CreateTodoButton from '../CreateTodoButton';

import TodosDisplay from './TodosDisplay';
import UserDisplay from '../UserDisplay';

interface CardProps {
	sectionTitle: string;
	hasButton: boolean;
	contentDisplayType: string;
	content: object[];
	onSubmit?: () => void;
}

interface ContentsProps {
	state: string;
	content: object[];
}

function getSpecificContentDisplay(content: any[]) {
	const contentDisplayDictionary: {[key: string]: React.ReactElement} = 	
		{
			'todo': <TodosDisplay todos={content}/>,
			'user': <UserDisplay users={content}/>
		};
	return contentDisplayDictionary;
}

function ContentsDisplay({ state, content }: ContentsProps): React.ReactElement {
	return (
		<div>
			{getSpecificContentDisplay(content)[state]}
		</div>
	);
}

const TodoCard = ({ sectionTitle, hasButton, contentDisplayType, content, onSubmit }: CardProps) => {

	return (
		<>
			<h1> {sectionTitle} </h1>
			<div className='card'>
				<ContentsDisplay state={contentDisplayType} content={content} />
				{hasButton && <CreateTodoButton />}
			</div>
		</>
	);
};

export default TodoCard;