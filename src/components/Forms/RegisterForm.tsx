import React, { useState } from 'react';
import { useStateValue } from '../../state/state';

import loginServices from '../../services/login';
import { useNavigate } from 'react-router';


const RegisterForm = () => {
	const [{ currentUser }, dispatch] = useStateValue();
	const navigate = useNavigate();

	const [usernameField, setUsernameField] = useState<string>('');
	const [nameField, setNameField] = useState<string>('');
	const [messageField, setMessageField] = useState<string>('');

	const updateFieldWithText = (f: (s: string) => void, text: string): void => {
		f(text);
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const attemptLogin = async () => {
			try {
				const userToCreate = {
					username: usernameField,
					name: nameField
				};
				const userRegister = await loginServices.registerNewUser(userToCreate);
				if (userRegister.status == 500 && userRegister.errors) {
					setMessageField(userRegister.errors[0]);
				} else {
					setMessageField('User created! Logging in...');
					const user = userRegister.user;
					if (user != undefined) {
						dispatch({type: 'SET_CURRENT_USER', payload: user});
						dispatch({type: 'SET_IS_LOGGED_IN', payload: true});
						console.log('i have set current user!!' + JSON.stringify(currentUser));
						navigate('/todos');
					}
				}
			} catch (e) {
				console.error(e);
			}
		};
		if (!validateFields()) {
			return;
		}
		attemptLogin();
		clearFields();
	};

	const validateFields = (): boolean => {
		if (usernameField.length < 4) {
			setMessageField('Username must be at least 4 characters! Please try again!');
			return false;
		}
		if (nameField.length < 4) {
			setMessageField('Name must be at least 4 characters! Please try again!');
			return false;
		}
		return true;
	};

	const clearFields = () => {
		setUsernameField('');
		setNameField('');
	};

	const handleCancel = () => {
		navigate('/login');
	};

	return (
		<div className='form register-form'>
			<form onSubmit={(e) => handleSubmitForm(e)}>
				<label htmlFor='login-form__login-username' className='typography--label typography--medium'> Username </label>
				<br />
				<input id='login-form__login-username' className='input--bordered' type='text' value={usernameField}
					onChange={(e) => updateFieldWithText(setUsernameField, e.target.value)} />
				<br />
				<label htmlFor='login-form__login-name' className='typography--label typography--medium'> Name </label>
				<br />
				<input id='login-form__login-name' className='input--bordered' type='text' value={nameField}
					onChange={(e) => updateFieldWithText(setNameField, e.target.value)} />
				<br />
				<button type='submit' className='text-button--orange button'> 
					<span> Create Account </span>
				</button>
			</form>
			
			<div className='button text-button--gray'
				// needed to call the callback
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onClick={handleCancel}>
				<span> Cancel </span>
			</div>

			<p className='typography--bold'> {messageField} </p>
		</div>
	);
};

export default RegisterForm;