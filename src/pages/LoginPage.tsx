import React from 'react';
import Logo from '../assets/wordmark-black.svg';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Forms/LoginForm';

const LoginPage = () => {
	return (
		<div className='display-content'>
			<div className='navbar__logo-container'>
				<Link to='/'> 
					<img src={Logo} className='site__logo navbar__logo' />
				</Link>
			</div>


			<h1> Login </h1>
			<LoginForm />

			<span> Don&apos;t have an account? </span> 
			<a href="register" className='typography--hyperlink'> Register here. </a>
		</div>
	);
};

export default LoginPage;