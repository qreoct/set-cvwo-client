import React from 'react';

interface ViewOnlyNotesAreaProps {
	text: string;
}

const ViewOnlyNotesArea = (props: ViewOnlyNotesAreaProps) => {
	return (
		<div className='todo-display-notepad'>
			{props.text == ''
				? <em> <span> Click on &apos;Edit Todo&apos; to add notes for this todo! </span> </em>
				: <span> {props.text} </span>
			}
		</div>
	);
};

export default ViewOnlyNotesArea;