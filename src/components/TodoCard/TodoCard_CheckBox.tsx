import React, { useState } from 'react';
import { Square, CheckSquare} from 'react-feather';

interface CheckBoxProps {
	handleComplete: () => void;
}

const TodoCard_CheckBox = ({handleComplete}: CheckBoxProps) => {

	const [isChecked, setIsChecked] = useState<boolean>(false);

	const handleMouseOver = () => {
		setIsChecked(true);
	};

	const handleMouseOut = () => {
		setIsChecked(false);
	};

	return (
		<div className='todo-display-checkbox' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
			onClick={handleComplete}>
			{isChecked ? <CheckSquare /> : <Square /> }
		</div>
	);
};

export default TodoCard_CheckBox;