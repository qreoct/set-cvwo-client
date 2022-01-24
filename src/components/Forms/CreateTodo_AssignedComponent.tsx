import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../state';
import PictureSkittle from '../PictureSkittle';
import teamServices from '../../services/team';

// Reused from https://github.com/qreoct/tyea/blob/master/react-frontend/src/components/ModalNew_TagInput.js

interface AssignedProps {
	onChange: (data: string[]) => void;
	submitted: boolean;
	setSubmitted: (isSubmitted: boolean) => void;
	onSubmit?: () => void;
}

const CreateTodo_AssignedComponent = ({onChange, submitted, setSubmitted}: AssignedProps) => {

	const [{ users }, dispatch] = useStateValue();

	const [state, setState] = useState<string[]>([]);
	
	useEffect(() => {
		const team = async () => {
			const users = await teamServices.getTeam();
			dispatch({ type: 'SET_TEAM', payload: users});
		};
		team();
	}, [dispatch]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setState([
				...state,
				e.target.id,
			]);
		} else {
			setState(
				state.filter((userId) => userId !== e.target.id)
			);
		}
	};

	useEffect(() => {
		onChange(state);
	}, [state]);

	useEffect(() => {
		if(submitted){ setState([]); setSubmitted(false); }

	}, [submitted, setSubmitted]);

	return (
		<div className='input-assign'>
			{Object.values(users).map(user => 
				<div key={user.id} className={'input-assign__cell'}>
					<input type="checkbox" id={`${user.id}`}
						className='input-assign__checkbox'
						name={user.name}
						value={user.id}
						onChange={(e) => handleOnChange(e)}
					/>
					<PictureSkittle data={user.name} />
					<label htmlFor={`${user.id}`} className='typography--bold'> {user.name} </label>
				</div>
			)}
			
		</div>
	);
};

export default CreateTodo_AssignedComponent;