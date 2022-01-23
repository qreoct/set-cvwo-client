import React, { useState } from 'react';
import { Todo } from '../../models/Todo.types';
import { User } from '../../models/User.types';
import CreateTodoButton from '../CreateTodoButton';

import TodosDisplay from './TodosDisplay';

interface CardProps {
	sectionTitle: string;
	hasButton: boolean;
	contentDisplayType: string;
	content: object[];
	emptyMessage?: string;
}

interface ContentsProps {
	state: string;
	content: object[];
}

function getSpecificContentDisplay(content: any[]) {
	const contentDisplayDictionary: {[key: string]: React.ReactElement} = 	
		{
			'todo': <TodosDisplay todos={content}/>
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

const TodoCard = ({ sectionTitle, hasButton, contentDisplayType, content, emptyMessage }: CardProps) => {

	const emptyMsg = emptyMessage ? <span> {emptyMessage} </span> : <span> This user has no todos... <em>yet!</em> </span>;

	return (
		<>
			<h1 className='typography--large'> {sectionTitle} </h1>
			<div className='card'>
				<ContentsDisplay state={contentDisplayType} content={content} />
				{content.length == 0 ? emptyMsg : ''}
				{hasButton && <CreateTodoButton />}
			</div>
		</>
	);
};

export default TodoCard;