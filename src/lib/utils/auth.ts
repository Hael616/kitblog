import { get, writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export type User = {
	id: string;
	email: string;
	password: string;
};

export type Session = {
	id: string;
	userId: string;
};

const usersStore = writable<User[]>([]);
const sessionStore = writable<Session[]>([]);

export function validateEmail(email: string) {
	const emailRegex = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/gm;

	const emailRegexExec = emailRegex.exec(email);

	if (emailRegexExec && emailRegexExec[0] === email) {
		return {
			success: true
		};
	}

	return {
		error: true,
		message: "Email is invalid"
	};
}

export function validatePassword(password: string) {
	const requireLength = password.length > 7;

	if (!requireLength) {
		return {
			error: true,
			message: "Password must be at least 7 characters or more"
		};
	}

	return {
		success: true
	};
}

export function createUser(email: string, password: string) {
	const emailValidationResult = validateEmail(email);
	const passwordValidationResult = validatePassword(password);

	if (emailValidationResult.error && passwordValidationResult.error) {
		throw new Error(emailValidationResult.message && passwordValidationResult.message);
	}

	const currentUsers = get(usersStore);
	const newUser: User = {
		id: uuid(),
		email,
		password
	};
}
