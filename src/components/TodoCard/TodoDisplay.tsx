import React, { useEffect, useState } from 'react';
import type { Todo } from '../../models/Todo.types';
import PictureSkittle from '../PictureSkittle';
import { Square, CheckSquare} from 'react-feather';
import { Link } from 'react-router-dom';

interface Props {
	todo: Todo;
}

const TodosDisplay = (props: Props) => {

	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [hoveredClass, setHoveredClass] = useState<string>('');

	const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsChecked(true);
		setHoveredClass('todo-display-container--hovered');
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsChecked(false);
		setHoveredClass('');
	};

	return (
		<div className={`todo-display-container ${hoveredClass}`}>
			<div className='todo-display-checkbox' onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
				{isChecked ? <CheckSquare /> : <Square /> }
			</div>
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

export default TodosDisplay;