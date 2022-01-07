import React from 'react';
import {
	BrowserRouter as Router,
	Routes, Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import MyTasksPage from './pages/MyTasksPage';
import TeamTasksPage from './pages/TeamTasksPage';

function App() {

	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<WelcomePage />} />
					<Route path='/team' element={<TeamTasksPage/>} />
					<Route path='/tasks' element={<MyTasksPage/>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
