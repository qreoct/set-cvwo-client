import React, { useState } from 'react';
import type { Todo } from '../../models/Todo.types';
import { useStateValue } from '../../state';
import PictureSkittle from '../PictureSkittle';
import EditableNotesArea from './EditableNotesArea';
import ViewOnlyNotesArea from './ViewOnlyNotesArea';

interface Props {
	todo: Todo;
}

const TodoView = (props: Props) => {
	
	const [{ currentUser }, dispatch] = useStateValue();

	const [messageField, setMessageField] = useState<string>('');
	const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
	const isEditor = props.todo.users.filter(u => u.id == currentUser?.id).length == 1; 

	const handleGoToEditingMode = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsEditingMode(true);
		setMessageField('');
	};

	return (
		<div className='todo-view-container'>
			<span className='typography--label typography--medium'> #{props.todo.id} </span>
			<h1> {props.todo.title} </h1>

			{props.todo.deadline &&
				<span className='todo-display-deadline'>
					<em>
						{`[Due on ${new Date(props.todo.deadline).toDateString()}]`}
					</em>
				</span>
			}

			<div className='todo-display-tags'>
				{props.todo.tags &&
							props.todo.tags.map((t) => 
								<span key={t.name} className='todo-display-tag typography--heavy'>
									{t.name}
								</span>
							)
				}
			</div>
			
			<div className='todo-display-assigned'>
				{props.todo.users &&
							props.todo.users.map((user) => 
								<PictureSkittle key={user.id} data={user.name} size='large'/>
							)
				}
			</div>

			<div className='todo-display-notes'>
				<span className='typography--label typography--medium'> Notes </span>
				{isEditingMode && isEditor ? <EditableNotesArea text={props.todo.notes}
					setIsEditingMode={setIsEditingMode}
					setMessage={setMessageField}/>
					: <ViewOnlyNotesArea text={props.todo.notes} /> }
			</div>

			{!isEditingMode && isEditor && !props.todo.done &&
			<div className='todo-display-edit-button button'
				onClick={e => handleGoToEditingMode(e)}>
				<span className='typography--bold'> Edit Todo </span>
			</div>
			}

			{props.todo.done
				? <p className='typography--bold'> This todo has been archived. </p>
				: <p className='typography--bold'> {messageField} </p>
			}

		</div>
	);

};

export default TodoView;