import axios from 'axios';
import { User } from '../models/User.types';
import { LoginResponse, RegisterResponse } from '../models/LoginResponse.types';
import BASEURL from '../utils/const';

const logIn = async (user: Record<string, string>): Promise<LoginResponse> => {
	const res = await axios.post(`${BASEURL}/login`, { user }, { withCredentials: true})
		.then(response => response.data)
		.catch(error => {
			console.error('Error logging in:', error);
		});

	return res;
};

const logOut = async () => {
	await axios.post(`${BASEURL}/logout`);
};

const getLoginStatus = async (): Promise<boolean> => {
	const res = await axios.get(`${BASEURL}/logged_in`, { withCredentials: true })    
		.then(response => response.data)
		.catch(error => console.error('Error logging in:', error));

	return res.logged_in;
};

const getCurrentLoggedInUser = async (): Promise<User> => {
	const res = await axios.get(`${BASEURL}/logged_in`, { withCredentials: true })    
		.then(response => response.data)
		.catch(error => console.error('No such user/not logged in:', error));
	return res.user;
};

const registerNewUser = async (user: Record<string, string>): Promise<RegisterResponse> => {
	const res = await axios.post(`${BASEURL}/users`, { user }, { withCredentials: true })
		.then(response => response.data)
		.catch(error => console.error('Not able to create user:', error));
	return res;
};


export default {
	logIn, logOut,
	getLoginStatus, getCurrentLoggedInUser,
	registerNewUser
};