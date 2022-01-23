import { assert } from 'console';
import React, { useEffect, useState } from 'react';
import { Tag } from '../../models/Tag.types';
import { Todo } from '../../models/Todo.types';
import { User } from '../../models/User.types';
import { useStateValue } from '../../state/state';
import utils from '../../utils/utils';

import CreateTodo_TagsInputComponent from './CreateTodo_TagsInputComponent';

const CreateTodoForm = () => {
	const [{ todos, currentUser, users }, dispatch] = useStateValue();

	const [messageField, setMessageField] = useState<string>('');

	const [submitted, setSubmitted] = useState<boolean>(false);

	const [todoToAdd, setTodoToAdd] = useState<Todo>({
		id: 0,
		created_by: 0,
		created_on: '',
		done: false,
		title: '',
		deadline: '',
		users: [],
		tags: [],
		notes: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setTodoToAdd({
			...todoToAdd,
			[e.target.name]: val
		});
	};

	const generateRandomNames = (): string[] => {
		const result:string[] = [];
		const size:number = Math.floor(Math.random()*5) + 1;
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		for (let i = 0; i < size; i ++) {
			result.push(characters.charAt(Math.floor(Math.random()*characters.length)));
		}
		return result;
	};

	const generateRandomUsers = (): User[] => {
		const randomNames: string[] = generateRandomNames();
		const users: User[] = [];
		if (currentUser != null) {
			users.push(currentUser);
		}
		randomNames.forEach(name => {
			users.push({
				id: Math.floor(Math.random()*55+1),
				name: name
			});
		});
		return users;
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const addTodo = async () => {
			try {
				if (currentUser != null && currentUser.id && todoToAdd.deadline) {
					const newTodo: Todo = {
						id: todoToAdd.id,
						title: todoToAdd.title,
						created_by: currentUser.id,
						users: generateRandomUsers(),
						created_on: (new Date).toISOString(),
						deadline: utils.ddMmYyyyToDateObject(todoToAdd.deadline).toISOString(),
						done: false,
						tags: todoToAdd.tags,
						notes: 'there are some notes'
					};
					dispatch({type: 'ADD_TODO', payload: newTodo});
					setSubmitted(true);
				}
			} catch (e) {
				console.error(e);
			}
		};
		if (!validateFields()) {
			return;
		}
		addTodo();
		setMessageField(`Todo '${todoToAdd.title}' has been added!`);
		clearFields();
	};

	const handleTag = (data: string[]) => {
		// const tags:Tag[] = data.map(t => t);

		const tags:Tag[] = [];
		data.forEach(t => {
			tags.push({name: t});
		});


		setTodoToAdd({
			...todoToAdd,
			tags: tags
		});
	};

	const validateFields = (): boolean => {
		if (todoToAdd.title.length < 4) {
			setMessageField('Task must have at least 4 characters! Please try again!');
			return false;
		}
		if (todoToAdd.deadline) {
			if (!utils.isDdMmYyyyFormat(todoToAdd.deadline)) {
				setMessageField('Deadline has to be formatted as dd/mm/yyyy! Please try again');
				return false;
			}
			if (!utils.isFutureDate(todoToAdd.deadline)) {
				setMessageField('Deadline has to be in the future!');
				return false;
			}
		} else {
			setMessageField('Please enter a deadline!');
			return false;
		}
		return true;
	};

	const clearFields = () => {
		setTodoToAdd({
			id: 0,
			created_by: 0,
			created_on: '',
			done: false,
			title: '',
			users: [],
			tags: [],
			deadline: '',
			notes: ''
		});
	};

	return (
		<div className='create-todo-form'>
			<form onSubmit={(e) => handleSubmitForm(e)}>
				<div className='form-field'>
					<label htmlFor='todo-form__todo-name' className='typography--label typography--medium'> I have to...</label>
					<br />
					<input id='todo-form__todo-name' type='text' name='title' className='input--underlined typography--heavy'
						value={todoToAdd.title}
						placeholder='Enter Task...'
						onChange={handleChange}/>
				</div>

				<div className='form-field'>
					<label htmlFor='todo-form__todo-deadline' className='typography--label typography--medium'> Due by</label>
					<br />
					<input id='todo-form__todo-deadline' type='text' name='deadline' className='input--underlined typography--heavy'
						value={todoToAdd.deadline}
						placeholder='dd/mm/yyyy'
						onChange={handleChange} />
					<br />
				</div>
				
				<div className='form-field'>
					<label htmlFor='todo-form__todo-assigned' className='typography--label typography--medium'> Assigned</label>
					<br />
					<input id='todo-form__todo-assigned' type='text' name='assigned' className='input--underlined typography--heavy'
						placeholder='people'
						onChange={handleChange} />
				</div>

				<div className='form-field'>
					<label htmlFor='todo-form__todo-tags' className='typography--label typography--medium'> Tags</label>
					<br />
					<CreateTodo_TagsInputComponent 
						onChange={(data) => handleTag(data)}
						submitted={submitted} setSubmitted={setSubmitted}/>
				</div>

				<button type='submit' className='button'> Submit </button>

				<br />
				<p className='typography--bold'> {messageField} </p>
			</form>
		</div>
	);
};

export default CreateTodoForm;