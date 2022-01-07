import React from 'react';
import type { Task } from '../models/Task.types';
import { Square } from 'react-feather';
import PictureSkittle from './PictureSkittle';

interface Props {
	tasks: Task[];
}


const TaskDisplay = (props: Props) => {

	return (
		<ol>
			{props.tasks.map((t?:Task) => 
				<div key={t?.id} className='task-display-container'> 
					<div className='task-display-checkbox'>
						<Square />
					</div>
					<div className='task-display-task'>
						<span> {t?.task_name} </span>
						{t?.deadline &&
						<span className='task-display-deadline'>
							<em>
								{`[Due on ${new Date(t?.deadline).toDateString()}]`}
							</em>
						</span>
						}
						<div className='task-display-assigned'>
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

export default TaskDisplay;