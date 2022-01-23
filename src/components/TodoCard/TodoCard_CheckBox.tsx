import React, { useState } from 'react';
import { Square, CheckSquare} from 'react-feather';

const TodoCard_CheckBox = () => {


	const [isChecked, setIsChecked] = useState<boolean>(false);

	const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsChecked(true);
	};

	const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsChecked(false);
	};

	return (
		<div className='todo-display-checkbox' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
			{isChecked ? <CheckSquare /> : <Square /> }
		</div>
	);
};

export default TodoCard_CheckBox;