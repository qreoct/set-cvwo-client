import React, { useState } from 'react';
import type { Todo } from '../../models/Todo.types';
import PictureSkittle from '../PictureSkittle';
import { Square, CheckSquare} from 'react-feather';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';

import todoServices from '../../services/todos';

interface Props {
	todo: Todo;
}

const TodoDisplay = (props: Props) => {

	const [{ currentUser }, dispatch] = useStateValue();
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [hoveredClass, setHoveredClass] = useState<string>('');

	

	const handleMouseOver = () => {
		setIsChecked(true);
		setHoveredClass('todo-display-container--hovered');
	};

	const handleMouseLeave = () => {
		setIsChecked(false);
		setHoveredClass('');
	};

	const handleComplete = () => {
		const completedTodo = {
			...props.todo,
			done: true
		};
		todoServices.updateTodo(props.todo.id, completedTodo);
		dispatch({type: 'UPDATE_TODO', payload: completedTodo});
	};

	return (
		<div className={`todo-display-container ${hoveredClass}`}>

			{currentUser && !props.todo.done && props.todo.users.filter(u => u.id == currentUser.id).length > 0 &&
			<div className='todo-display-checkbox' onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}
				onClick={handleComplete}>
				{isChecked ? <CheckSquare /> : <Square /> }
			</div>
			}

			<div className='todo-display-todo'>
				
				<Link to={`/todos/${props.todo.id}`} className='typography--no-decorate typography--hover'>
					<span> {props.todo.title} </span>
				</Link>

				{props.todo.deadline &&
						<span className='todo-display-deadline'>
							<em>
								{`[Due on ${new Date(props.todo.deadline).toDateString()}]`}
							</em>
						</span>
				}
				<div className='todo-display-assigned'>
					{props.todo.users &&
								props.todo.users.map((user) => 
									<PictureSkittle key={user.id} data={user.name} />
								)
					}
				</div>
				<div className='todo-display-tags'>
					{props.todo.tags &&
								props.todo.tags.map((t) => 
									<span key={t.name} className='todo-display-tag typography--heavy'>
										{t.name}
									</span>
								)
					}
				</div>
			</div>
		</div>
	);

};

export default TodoDisplay;