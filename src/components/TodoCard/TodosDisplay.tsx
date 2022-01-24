import React from 'react';
import type { Todo } from '../../models/Todo.types';
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