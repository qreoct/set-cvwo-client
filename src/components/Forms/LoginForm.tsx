import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../state/state';

import loginServices from '../../services/login';
import { useNavigate } from 'react-router';


const LoginForm = () => {
	const [{ currentUser, todos }, dispatch] = useStateValue();
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
					console.log('result: ' + JSON.stringify(user));
					if (user != undefined) {
						dispatch({type: 'SET_CURRENT_USER', payload: user});
						dispatch({type: 'SET_IS_LOGGED_IN', payload: userLoggedIn.logged_in});
						console.log('i have set current user!!' + JSON.stringify(currentUser));
						navigate('/todos');
					}
				}

			} catch (e) {
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
				<label htmlFor='login-form__login-username'> Username </label>
				<br />
				<input id='login-form__login-username' className='login-form__input' type='text' value={usernameField}
					onChange={(e) => updateFieldWithText(setUsernameField, e.target.value)} />
				<br />
				<br />
				<button type='submit' className='button login-form__button'> Login </button>
			</form>

			<p className='typography-bold'> {messageField} </p>
		</div>
	);
};

export default LoginForm;