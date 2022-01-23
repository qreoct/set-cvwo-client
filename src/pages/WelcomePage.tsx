import React from 'react';
import PreviewPic from '../assets/preview.png';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
	return (
		<div className='display-content'>
			<h1> Set sights on your team&apos;s success </h1>

			<p> SET revolutionizes task management and electrifies team spirit.</p>
			<p> View the status of your team at a glance, assign tasks, and soar in 
				task management like never before. </p>

			<img src={PreviewPic} style={{display: 'block', maxHeight: 450}}/>
			
			<a href="/login" className='typography--hyperlink typography--xlarge typography--hover-spicy'> Ready? Get SET </a>
		</div>
	);
};

export default WelcomePage;