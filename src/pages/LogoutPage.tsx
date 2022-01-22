import React, { useEffect, useState } from 'react';
import Logo from '../assets/wordmark-black.svg';
import { Link } from 'react-router-dom';
import { useStateValue } from '../state/state';
import { Navigate } from 'react-router';
import loginServices from '../services/login';

const LogoutPage = () => {

	const [{ isLoading }, dispatch] = useStateValue();
	const [loggedOut, setLoggedOut] = useState(false);

	useEffect(() => {
		loginServices.logOut();
		dispatch({ type: 'SET_IS_LOGGED_IN', payload: false });
		dispatch({ type: 'REMOVE_CURRENT_USER' });
	}, []);

	return (
		<div className='display-content'>
			<div className='navbar__logo-container'>
				<Link to='/'> 
					<img src={Logo} className='site__logo navbar__logo' />
				</Link>
			</div>


			<h1> Log out </h1>

			<span> Logging out... </span> 

			{loggedOut ? <Navigate replace to='/' /> : <></> }
		</div>
	);
};

export default LogoutPage;