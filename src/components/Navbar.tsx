import React, { useState } from 'react';
import Logo from '../assets/wordmark-black.svg';
import UserImage from '../assets/dog.jpg';
import { User, Users, Search, CheckSquare, Tool, Menu } from 'react-feather';
import { Link } from 'react-router-dom';

const Navbar = () => {

	const [isMobileNavbarShowing, setIsMobileNavbarShowing] = useState(false);

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
					<Link to='/' className='typography--button' onClick={() => toggleNavBar()}>
						<Menu />
					</Link>
					}
					
				</div>


				<ul className='navbar__links'>
					<li>
						<Link to="tasks">
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
						<Link to='/'>
							<CheckSquare />
							<span className='navbar__link'> Archive </span>
						</Link>
					</li>
					<li>
						<Link to='/'>
							<Search />
							<span className='navbar__link'> Search </span>
						</Link>
					</li>
					<li>
						<Link to='/'>
							<Tool />
							<span className='navbar__link'> Manage </span>
						</Link>
					</li>

				</ul>
				<div className='navbar__user'>
					<img src={UserImage} style={{borderRadius:100, height:36, width:36, verticalAlign:'middle'}}/>
					<div className='navbar__user-details'>
						<strong> <span> Ronald McDonald </span> </strong>
						<span className='typography--label'> Training Director </span>
					</div>
				</div>
			</nav>
		
			<div className='mobile__navbar'>
				<div>
					<Link to='/'> 
						<img src={Logo} className='site__logo navbar__logo' />
					</Link>
				</div>

				<Link to='/' className='typography--button' onClick={() => toggleNavBar()}>
					<Menu />
				</Link>
			</div>
		</div>
	);
};


export default Navbar;