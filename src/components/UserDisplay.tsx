import React from 'react';
import type { User } from '../models/User.types';

interface Props {
	users: User[];
}

const UserDisplay = (props: Props) => {
	return (
		<ol>
			<li> this is the user display. </li>
			{props.users.map((u?:User) => 
				<li key={u?.id}> {u?.display_name} </li>
			)}
		</ol>
	);

};

export default UserDisplay;