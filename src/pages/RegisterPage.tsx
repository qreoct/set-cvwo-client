import React from 'react';
import Logo from '../assets/wordmark-black.svg';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/Forms/RegisterForm';

const RegisterPage = () => {
	return (
		<div className='display-content'>
			<div className='navbar__logo-container'>
				<Link to='/'> 
					<img src={Logo} className='site__logo navbar__logo' />
				</Link>
			</div>


			<h1> Register </h1>

			<RegisterForm />
		</div>
	);
};

export default RegisterPage;