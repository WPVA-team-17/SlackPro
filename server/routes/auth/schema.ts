import { defaultReplyMsg, id, token } from "../../plugins/schema.js";

const loginPassword = {
	title: "Login or password",
	description: "Login or password schema",
	type: "string",
	minLength: 3,
	maxLength: 20,
	default: "admin",
};

const email = {
	title: "Email",
	description: "Login or email schema",
	type: "string",
	format: "email",
};

const user = {
	title: "User",
	description: "User schema",
	type: "object",
	properties: {
		id,
		login: loginPassword,
		email,
	},
	required: ["id", "login"],
};

const authRequest = {
	type: "object",
	properties: {
		login: loginPassword,
		password: loginPassword,
		email,
	},
	required: ["login", "password", "email"],
};

const authReply = {
	200: {
		type: "object",
		properties: {
			token,
			user,
		},
		required: ["token", "user"],
	},
	400: defaultReplyMsg,
	500: defaultReplyMsg,
};

const nameSurname = {
	title: "Name or surname",
	description: "Name or surname schema",
	type: "string",
	minLength: 3,
	maxLength: 20,
	default: "admin",
};

const registerRequest = {
	type: "object",
	properties: {
		login: loginPassword,
		password: loginPassword,
		email,
		name: nameSurname,
		surname: nameSurname,
	},
	required: ["login", "password", "email", "name", "surname"],
};

const registerReply = {
	200: {
		type: "object",
		properties: {
			token,
			user,
		},
		required: ["token", "user"],
	},
	400: defaultReplyMsg,
	500: defaultReplyMsg,
};

const registerScheme = {
	body: registerRequest,
	response: registerReply,
	tags: ["auth"],
	summary: "Register schema",
	description: "Register schema",
	consumes: ["application/json"],
	produces: ["application/json"],
};

const loginSchema = {
	body: authRequest,
	response: authReply,
	tags: ["auth"],
	summary: "Login schema",
	description: "Login schema",
	consumes: ["application/json"],
	produces: ["application/json"],
};

export default { registerScheme, loginSchema };
