import React, { useState } from 'react';
import { Task } from '../models/Task.types';
import { User } from '../models/User.types';

import TaskDisplay from './TaskDisplay';
import UserDisplay from './UserDisplay';

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
			'task': <TaskDisplay tasks={content}/>,
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

const TaskCard = ({ sectionTitle, hasButton, contentDisplayType, content, onSubmit }: CardProps) => {

	return (
		<>
			<h1> {sectionTitle} </h1>
			<div className='card'>
				<ContentsDisplay state={contentDisplayType} content={content} />
			</div>
			{hasButton && <button> Button! </button>}
		</>
	);
};

export default TaskCard;