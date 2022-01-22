import type { User } from './User.types';

export type LoginResponse = {
	user?: User
	status: number
	logged_in: boolean
	errors?: [string]
};

export type RegisterResponse = {
	user?: User
	status: number
	errors?: [string]
}