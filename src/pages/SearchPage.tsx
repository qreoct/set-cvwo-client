import React, { useEffect, useState } from 'react';
import TodoCard from '../components/TodoCard/TodoCard';
import { Todo } from '../models/Todo.types';
import { useStateValue } from '../state';

const ArchiveTodosPage = () => {
	const [{ todos }, dispatch] = useStateValue();

	const [filteredTodos, setFilteredTodos] = useState<Todo[]>(Object.values(todos));
	const [filter, setFilter] = useState({
		title: '',
		tag: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setFilter({
			...filter,
			[e.target.name]: val
		});
	};

	useEffect(() => {
		setFilteredTodos(Object.values(todos));
	}, []);

	useEffect(() => {
		let newTodos : Todo[] = Object.values(todos);
		if (filter.title == '' && filter.tag == '') {
			setFilteredTodos(Object.values(todos));
		}
		if (filter.title != '') {
			newTodos = newTodos.filter(t => t.title.toLowerCase().includes(filter.title.toLowerCase()));
		} 
		if (filter.tag != '') {
			newTodos = newTodos.filter(t => t.tags.filter(tag => tag.name.toLowerCase().includes(filter.tag.toLowerCase())).length > 0);
		}
		setFilteredTodos(newTodos);
	}, [filter]);

	return (
		<div className='interactive-content'>
			<h1> Search </h1>

			<div className='form-field'>
				<label htmlFor='search-form__title' className='typography--label typography--medium'> Search in name </label>
				<br />
				<input id='search-form__title' type='text' name='title' className='input--underlined typography--heavy'
					value={filter.title}
					onChange={handleChange}/>
			</div>

			<div className='form-field'>
				<label htmlFor='search-form__tag' className='typography--label typography--medium'> Search for tag </label>
				<br />
				<input id='search-form__tag' type='text' name='tag' className='input--underlined typography--heavy'
					value={filter.tag}
					onChange={handleChange}/>
			</div>

			<TodoCard sectionTitle='' hasButton={false} contentDisplayType='todo'
				content={filteredTodos} emptyMessage='Unable to find any todos :('/>

		</div>
	);
};

export default ArchiveTodosPage;
