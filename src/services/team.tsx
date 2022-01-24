import axios from 'axios';
import { User } from '../models/User.types';
import BASEURL from '../utils/const';

const getTeam = async (): Promise<User[]> => {
	const res = axios.get(`${BASEURL}/users`)
		.then(response => response.data)
		.catch(error => console.error(error));
	return res;
};

export default {
	getTeam
};