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
	minLength: 6,
	maxLength: 255,
};

const nameSurname = {
	title: "Name or surname",
	description: "Name or surname schema",
	type: "string",
	minLength: 3,
	maxLength: 20,
	default: "admin",
};

const user = {
	title: "User",
	description: "User schema",
	type: "object",
	properties: {
		id,
		email,
		name: nameSurname,
		surname: nameSurname,
	},
	required: ["id", "email", "name", "surname"],
};

const registerRequest = {
	type: "object",
	properties: {
		email,
		password: loginPassword,
		name: nameSurname,
		surname: nameSurname,
	},
	required: ["password", "email", "name", "surname"],
};

const loginRequest = {
	type: "object",
	properties: {
		email,
		password: loginPassword,
	},
	required: ["email", "password"],
};

const loginRegisterReply = {
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

const registerSchema = {
	body: registerRequest,
	response: loginRegisterReply,
	tags: ["auth"],
	summary: "Register schema",
	description: "Register schema",
	consumes: ["application/json"],
	produces: ["application/json"],
};

const loginSchema = {
	body: loginRequest,
	response: loginRegisterReply,
	tags: ["auth"],
	summary: "Login schema",
	description: "Login schema",
	consumes: ["application/json"],
	produces: ["application/json"],
};

export default { registerSchema, loginSchema };
