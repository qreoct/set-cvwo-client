import React, { useState } from 'react';
import { useStateValue } from '../../state';

import todoServices from '../../services/todos';

interface EditableNotesAreaProps {
	text: string;
	id: number;
	setIsEditingMode: (mode: boolean) => void;
	setMessage: (message: string) => void;
}

const EditableNotesArea = (props: EditableNotesAreaProps) => {

	const [editedNotes, setEditedNotes] = useState<string>(props.text);
	const [{ todos }, dispatch] = useStateValue();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditedNotes(e.target.value);
	};

	const handleSubmit = () => {
		const currentTodo = Object.values(todos).filter(t => t.id == props.id);
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
				<div className='text-button--green button'
					onClick={handleSubmit}>
					<span className='typography--bold'> Save Todo </span>
				</div>

				<div className='text-button--gray button'
					// needed to call the callback
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					onClick={e => props.setIsEditingMode(false)}>
					<span className='typography--bold'> Cancel </span>
				</div>
			</div>
		</div>
	);
};

export default EditableNotesArea;