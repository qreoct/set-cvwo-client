import React, { useEffect, useState } from 'react';
import { useStateValue } from '../state/state';


const CreateTaskForm = () => {
	const [{ tasks }, dispatch] = useStateValue();

	const [taskNameField, setTaskNameField] = useState<string>('');

	const updateFieldWithText = (f: (s: string) => void, text: string): void => {
		f(text);
	};

	const generateRandomNames = (): string[] => {
		const result:string[] = [];
		const size:number = Math.floor(Math.random()*5) + 1;
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz;';
		for (let i = 0; i < size; i ++) {
			result.push(characters.charAt(Math.floor(Math.random()*characters.length)));
		}
		return result;
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const addTask = async () => {
			try {
				const taskToAdd = {
					id: Math.floor(Math.random()*55 + 5),
					task_name: taskNameField,
					created_by: 'Ronald McDonald',
					assigned_to: generateRandomNames(),
					created_on: JSON.stringify(new Date),
					completed: false,
					tags: []
				};
				dispatch({type: 'ADD_TASK', payload: taskToAdd});
			} catch (e) {
				console.error(e);
			}
		};
		addTask();
		setTaskNameField('');
	};

	return (
		<div className='create-task-form'>
			<h3> New Task </h3>
			<form onSubmit={(e) => handleSubmitForm(e)}>
				<label htmlFor='task-form__task-name'> I have to...</label>
				<input id='task-form__task-name' type='text' value={taskNameField}
					onChange={(e) => updateFieldWithText(setTaskNameField, e.target.value)} />
				<button type='submit'> Submit </button>
			</form>
		</div>
	);
};

export default CreateTaskForm;