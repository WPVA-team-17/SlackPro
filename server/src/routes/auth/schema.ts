import { chatArray, defaultReplyMsg, id, loginPassword, nameSurname, token } from "../../plugins/schema.js";

const user = {
	title: "User",
	description: "User schema",
	type: "object",
	properties: {
		id,
		login: loginPassword,
		name: nameSurname,
		surname: nameSurname,
	},
	required: ["id", "login", "name", "surname"],
};

const registerRequest = {
	type: "object",
	properties: {
		login: loginPassword,
		password: loginPassword,
		name: nameSurname,
		surname: nameSurname,
	},
	required: ["password", "login", "name", "surname"],
};

const loginRequest = {
	type: "object",
	properties: {
		login: loginPassword,
		password: loginPassword,
	},
	required: ["login", "password"],
};

const loginRegisterReply = {
	200: {
		type: "object",
		properties: {
			token,
			user,
			chats: chatArray,
		},
		required: ["token", "user", "chats"],
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
