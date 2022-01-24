import React, { useState } from 'react';
import { Tag } from '../../models/Tag.types';
import { Todo } from '../../models/Todo.types';
import { User } from '../../models/User.types';
import { useStateValue } from '../../state/state';
import utils from '../../utils/utils';
import todoServices from '../../services/todos';

import CreateTodo_TagsInputComponent from './CreateTodo_TagsInputComponent';
import CreateTodo_AssignedComponent from './CreateTodo_AssignedComponent';
import { useNavigate } from 'react-router';

const CreateTodoForm = () => {
	const [{ todos, currentUser, users }, dispatch] = useStateValue();
	
	const navigate = useNavigate();

	const [messageField, setMessageField] = useState<string>('');

	const [submitted, setSubmitted] = useState<boolean>(false);

	const [todoToAdd, setTodoToAdd] = useState<Todo>({
		id: Object.values(todos).length + 1,
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

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const addTodo = async () => {
			try {
				if (currentUser != null && currentUser.id && todoToAdd.deadline) {
					const newTodo = {
						todo: {
							id: todoToAdd.id,
							title: todoToAdd.title,
							users: todoToAdd.users,
							deadline: utils.ddMmYyyyToDateObject(todoToAdd.deadline).toISOString(),
							done: false,
							tags: todoToAdd.tags,
							notes: ''
						},
						currentUser
					};
					const created = await todoServices.create(newTodo);
					if (created.todo != undefined) {
						dispatch({type: 'ADD_TODO', payload: created.todo});
						setSubmitted(true);
					}
					if (created.errors) {
						setMessageField(created.errors[0]);
						return;
					}
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
		navigate('/todos');
	};

	const handleTag = (data: string[]) => {
		const tags:Tag[] = [];
		data.forEach(t => {
			tags.push({name: t});
		});

		setTodoToAdd({
			...todoToAdd,
			tags: tags
		});
	};

	const handleAssigned = (data: string[]) => {
		const usersToAdd:User[] = [];
		const userArray = Object.values(users);
		data.forEach(u => {
			const userObject = userArray.find(user => user.id == parseInt(u));
			if (userObject) {
				usersToAdd.push(userObject);
			}
		});

		setTodoToAdd({
			...todoToAdd,
			users: usersToAdd
		});
	};

	const validateFields = (): boolean => {
		if (todoToAdd.title.length < 4) {
			setMessageField('Task must have at least 4 characters! Please try again!');
			return false;
		}
		if (todoToAdd.users.length < 1) {
			setMessageField('Must assign at least 1 team member to task!');
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
					<CreateTodo_AssignedComponent
						onChange={(data) => handleAssigned(data)}
						submitted={submitted} setSubmitted={setSubmitted}/>
				</div>

				<div className='form-field'>
					<label htmlFor='todo-form__todo-tags' className='typography--label typography--medium'> Tags</label>
					<br />
					<CreateTodo_TagsInputComponent 
						onChange={(data) => handleTag(data)}
						submitted={submitted} setSubmitted={setSubmitted}/>
				</div>

				<button type='submit' className='button text-button--green'>
					<span className='typography--bold'> Submit
					</span>
				</button>

				<br />
				<p className='typography--bold'> {messageField} </p>
			</form>
		</div>
	);
};

export default CreateTodoForm;