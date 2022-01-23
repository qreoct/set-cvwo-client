import React, { useState } from 'react';
import { useStateValue } from '../../state';

import todoServices from '../../services/todos';

interface EditableNotesAreaProps {
	text: string;
	setIsEditingMode: (mode: boolean) => void;
	setMessage: (message: string) => void;
}

const EditableNotesArea = (props: EditableNotesAreaProps) => {

	const [editedNotes, setEditedNotes] = useState<string>(props.text);
	const [{ todos }, dispatch] = useStateValue();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditedNotes(e.target.value);
	};

	const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
		const currentTodo = Object.values(todos).filter(t => t.notes == props.text && t.notes != '');
		if (currentTodo.length == 0) {
			return;
		}

		const updatedTodo = {
			...currentTodo[0],
			notes: editedNotes
		};
		todoServices.updateTodo(currentTodo[0].id, updatedTodo);
		dispatch({type: 'UPDATE_TODO', payload: updatedTodo});
		props.setIsEditingMode(false);
		props.setMessage('Edited notes succesfully!');
	};

	return (
		<div>
			<textarea value={editedNotes} placeholder='Click on "Save Todo" to save changes'
				onChange={e => handleChange(e)}
				className='editable-textarea'/>

				
			<div style={{display: 'flex'}}>
				<div className='todo-display-save-button button'
					onClick={e => handleSubmit(e)}>
					<span className='typography--bold'> Save Todo </span>
				</div>

				<div className='todo-display-cancel-button button'
					onClick={e => props.setIsEditingMode(false)}>
					<span className='typography--bold'> Cancel </span>
				</div>
			</div>
		</div>
	);
};

export default EditableNotesArea;