import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User.types';
import { LoginResponse, RegisterResponse } from '../models/LoginResponse.types';
const baseUrl = '';

const getTeam = async (): Promise<User[]> => {
	const res = axios.get(`${baseUrl}/users`)
		.then(response => response.data)
		.catch(error => console.error(error));
	return res;
};

export default {
	getTeam
};