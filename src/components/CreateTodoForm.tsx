import React, { useEffect, useState } from 'react';
import { useStateValue } from '../state/state';


const CreateTodoForm = () => {
	const [{ todos }, dispatch] = useStateValue();

	const [todoNameField, setTodoNameField] = useState<string>('');

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
		const addTodo = async () => {
			try {
				const todoToAdd = {
					id: Math.floor(Math.random()*55 + 5),
					todo_name: todoNameField,
					created_by: 'Ronald McDonald',
					assigned_to: generateRandomNames(),
					created_on: JSON.stringify(new Date),
					completed: false,
					tags: []
				};
				dispatch({type: 'ADD_TODO', payload: todoToAdd});
			} catch (e) {
				console.error(e);
			}
		};
		addTodo();
		setTodoNameField('');
	};

	return (
		<div className='create-todo-form'>
			<h3> New Todo </h3>
			<form onSubmit={(e) => handleSubmitForm(e)}>
				<label htmlFor='todo-form__todo-name'> I have to...</label>
				<input id='todo-form__todo-name' type='text' value={todoNameField}
					onChange={(e) => updateFieldWithText(setTodoNameField, e.target.value)} />
				<button type='submit'> Submit </button>
			</form>
		</div>
	);
};

export default CreateTodoForm;