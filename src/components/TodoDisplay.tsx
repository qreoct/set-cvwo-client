import React from 'react';
import type { Todo } from '../models/Todo.types';
import { Square } from 'react-feather';
import PictureSkittle from './PictureSkittle';

interface Props {
	todos: Todo[];
}


const TodoDisplay = (props: Props) => {

	return (
		<ol>
			{props.todos.map((t?:Todo) => 
				<div key={t?.id} className='todo-display-container'> 
					<div className='todo-display-checkbox'>
						<Square />
					</div>
					<div className='todo-display-todo'>
						<span> {t?.todo_name} </span>
						{t?.deadline &&
						<span className='todo-display-deadline'>
							<em>
								{`[Due on ${new Date(t?.deadline).toDateString()}]`}
							</em>
						</span>
						}
						<div className='todo-display-assigned'>
							{t?.assigned_to && 
								t?.assigned_to.map((p) => 
									<PictureSkittle key={p} data={p} />
								)
							}
						</div>
					</div>
				</div>
			)}
		</ol>
	);

};

export default TodoDisplay;