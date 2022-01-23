import React, { useEffect, useState } from 'react';
import Logo from '../assets/wordmark-black.svg';
import UserImage from '../assets/dog.jpg';
import { User, Users, Search, CheckSquare, Tool, Menu, LogOut } from 'react-feather';
import { Link } from 'react-router-dom';
import { useStateValue } from '../state';

const Navbar = () => {

	const [isMobileNavbarShowing, setIsMobileNavbarShowing] = useState(false);
	const [currentUsername, setCurrentUsername] = useState('');
	const [{ isLoggedIn, currentUser }, dispatch] = useStateValue();

	useEffect(() => {
		if (currentUser != null) {
			setCurrentUsername(currentUser.name);
		}
	}, []);

	const toggleNavBar = () => {
		if(isMobileNavbarShowing) {
			hideNavBar();
		} else {
			showNavBar();
		}
		setIsMobileNavbarShowing(!isMobileNavbarShowing);
	};

	const showNavBar = () => {
		document.getElementsByClassName('navbar')[0].setAttribute('style', 'display: flex; opacity: 1');
	};

	const hideNavBar = () => {
		document.getElementsByClassName('navbar')[0].setAttribute('style', 'display: none; opacity: 0');
	};

	return (
		<div>
			<nav className='navbar'> 
				<div className='navbar__logo-container'>
					<Link to='/'> 
						<img src={Logo} className='site__logo navbar__logo' />
					</Link>
					{isMobileNavbarShowing &&
					<div className='typography--button' onClick={() => toggleNavBar()}>
						<Menu />
					</div>
					}
					
				</div>


				<ul className='navbar__links'>
					<li>
						<Link to="todos">
							<User />
							<span className='navbar__link'> Me </span>
						</Link>
					</li>
					<li>
						<Link to="team">
							<Users />
							<span className='navbar__link'> Team </span>
						</Link>
					</li>
					<li>
						<Link to='/archive'>
							<CheckSquare />
							<span className='navbar__link'> Archive </span>
						</Link>
					</li>
					<li>
						<Link to='/search'>
							<Search />
							<span className='navbar__link'> Search </span>
						</Link>
					</li>
					<li>
						<Link to='/logout'>
							<LogOut />
							<span className='navbar__link'> Logout </span>
						</Link>
					</li>

				</ul>
				<div className='navbar__user'>
					<img src={UserImage} style={{borderRadius:100, height:36, width:36, verticalAlign:'middle'}}/>
					<div className='navbar__user-details'>
						<strong> <span> {currentUsername} </span> </strong>
						<span className='typography--label'> Beta Tester </span>
					</div>
				</div>
			</nav>
		
			<div className='mobile__navbar'>
				<div>
					<Link to='/'> 
						<img src={Logo} className='site__logo navbar__logo' />
					</Link>
				</div>

				<div className='typography--button' onClick={() => toggleNavBar()}>
					<Menu />
				</div>
			</div>
		</div>
	);
};


export default Navbar;