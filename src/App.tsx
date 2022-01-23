import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes, Route, Navigate
} from 'react-router-dom';

import Navbar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import MyTodosPage from './pages/MyTodosPage';
import TeamTodosPage from './pages/TeamTodosPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import RegisterPage from './pages/RegisterPage';

import loginServices from './services/login';
import { useStateValue } from './state';
import { User } from './models/User.types';
import CreateTodoPage from './pages/CreateTodoPage';
import ViewTodoPage from './pages/ViewTodoPage';

function App() {
	
	const [{ currentUser, isLoggedIn }, dispatch] = useStateValue();

	useEffect(() => {
		const fetchData = async () => {
			const status = await loginServices.getLoginStatus();
			if (status) {
				dispatch({ type: 'SET_CURRENT_USER', payload: await loginServices.getCurrentLoggedInUser()});
				dispatch({ type: 'SET_IS_LOGGED_IN', payload: status });
			} else {
				dispatch({ type: 'SET_IS_LOGGED_IN', payload: false });
				dispatch({ type:'REMOVE_CURRENT_USER'});
			}
		};

		fetchData().catch(console.error);
	}, []);
	console.log('isloggedin ' + isLoggedIn);
	console.log(isLoggedIn ? JSON.stringify(currentUser) : '');

	return (
		<div className='App'>
			<Router>
				{isLoggedIn ? 
					<>
						<Navbar />
						<Routes>
							<Route path='/' element={<MyTodosPage />} />
							<Route path='/create' element={<CreateTodoPage />} />
							<Route path='/team' element={<TeamTodosPage/>} />
							<Route path='/todos' element={<MyTodosPage/>} />
							<Route path='/logout' element={<LogoutPage/>} />
							<Route path='/todos/:id' element={<ViewTodoPage/>} />
						</Routes>
					</>
					:
					<>
						<Routes>
							<Route path='/' element={<WelcomePage />} />
							<Route path='/login' element={<LoginPage/>} />
							<Route path='/register' element={<RegisterPage/>} />
							<Route path='/logout' element={<Navigate replace to="/" />} />
							<Route path ='*' element={<Navigate replace to='/' />} />
						</Routes>
					</>
				}
			</Router>
		</div>
	);
}

export default App;
