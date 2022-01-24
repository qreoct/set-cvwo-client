import React, { useState } from 'react';
import { useStateValue } from '../../state/state';

import loginServices from '../../services/login';
import { useNavigate } from 'react-router';


const LoginForm = () => {
	const [{ currentUser }, dispatch] = useStateValue();
	const navigate = useNavigate();

	const [usernameField, setUsernameField] = useState<string>('');
	const [messageField, setMessageField] = useState<string>('');

	const updateFieldWithText = (f: (s: string) => void, text: string): void => {
		f(text);
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const attemptLogin = async () => {
			try {
				const userToLogin = {
					username: usernameField
				};
				const userLoggedIn = await loginServices.logIn(userToLogin);
				if (userLoggedIn.status == 401 && userLoggedIn.errors != null) {
					setMessageField(userLoggedIn.errors[0]);
				} else {
					setMessageField('Logging in...!');
					const user = userLoggedIn.user;
					if (user != undefined) {
						dispatch({type: 'SET_CURRENT_USER', payload: user});
						dispatch({type: 'SET_IS_LOGGED_IN', payload: userLoggedIn.logged_in});
						console.log('i have set current user!!' + JSON.stringify(currentUser));
						navigate('/todos');
					}
				}

			} catch (e) {
				setMessageField('Some server error occured.');
				console.error(e);
			}
		};
		if (usernameField.length < 4) {
			setMessageField('Invalid username! Please try again');
			return;
		}
		attemptLogin();
		setUsernameField('');
	};

	return (
		<div className='form login-form'>
			<form onSubmit={(e) => handleSubmitForm(e)}>
				<label htmlFor='login-form__login-username' className='typography--label typography--medium'> Username </label>
				<br />
				<input id='login-form__login-username' className='input--bordered' type='text' value={usernameField}
					onChange={(e) => updateFieldWithText(setUsernameField, e.target.value)} />
				<br />
				<br />
				<button type='submit' className='button text-button--green'> 
					<span className='typography--bold'> Login </span>
				</button>
			</form>

			<p className='typography--bold'> {messageField} </p>
		</div>
	);
};

export default LoginForm;