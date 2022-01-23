import React, { useEffect, useState } from 'react';
import type { Todo } from '../../models/Todo.types';
import PictureSkittle from '../PictureSkittle';
import TodoCard_CheckBox from './TodoCard_CheckBox';
import TodoDisplay from './TodoDisplay';

interface Props {
	todos: Todo[];
}

const TodosDisplay = (props: Props) => {

	return (
		<ol>
			{props.todos.map((t?:Todo) => 
				t && <TodoDisplay key={t?.id} todo={t} />
			)}
		</ol>
	);

};

export default TodosDisplay;