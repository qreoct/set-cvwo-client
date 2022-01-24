import React from 'react';
import TodoCard from '../components/TodoCard/TodoCard';
import { useStateValue } from '../state';

const ArchiveTodosPage = () => {
	const [{ todos }] = useStateValue();

	return (
		<div className='interactive-content'>
			<h1> Archived </h1>

			<TodoCard sectionTitle='' hasButton={false} contentDisplayType='todo'
				content={Object.values(todos).filter(t => t.done)}
				emptyMessage='There&apos;s nothing in the archive yet! Let&apos;s achieve something!'/> 

		</div>
	);
};

export default ArchiveTodosPage;
