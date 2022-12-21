const text = {
	title: "Text",
	description: "Text schema",
	type: "string",
	minLength: 1,
	maxLength: 1000,
	default: "Hello world!",
};

const id = {
	title: "Id",
	description: "Id schema",
	type: "string",
	minLength: 25,
	maxLength: 25,
	default: "cl6guzfl80002v8ta8oagfd5h",
};

const bearerAuth = {
	type: "http",
	scheme: "bearer",
	name: "Authorization",
	description: "Bearer authentication",
	bearerFormat: "JWT",
	in: "header",
};

const token = {
	title: "Token",
	description: "Token schema",
	type: "string",
	minLength: 172,
	maxLength: 172,
	default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsNmhzOGJ6ajAwMDJqd3RhbThqYmQ1OTgiLCJpYXQiOjE2NjA5MjYyODQsImV4cCI6MTY2MDkyOTg4NH0.FfXv6bb2RR0jcT6pw7r3fGdiAI5qL6vWc9zPt7vkjY4",
};

const defaultReplyMsg = {
	type: "object",
	properties: {
		message: text,
	},
	required: ["message"],
};

const defaultReply = {
	200: defaultReplyMsg,
	400: defaultReplyMsg,
	401: defaultReplyMsg,
	404: defaultReplyMsg,
	500: defaultReplyMsg,
};

const idParam = {
	name: "id",
	in: "path",
	description: "List id",
	required: true,
	schema: {
		type: "string",
		minLength: 15,
		maxLength: 30,
	},
};

const loginPassword = {
	title: "Login or password",
	description: "Login or password schema",
	type: "string",
	minLength: 3,
	maxLength: 20,
	default: "admin",
};

const nameSurname = {
	title: "Name or surname",
	description: "Name or surname schema",
	type: "string",
	minLength: 3,
	maxLength: 20,
	default: "admin",
};


const createdAt = {
	title: "Created at",
	description: "Created at schema",
	type: "string",
	format: "date-time",
	default: new Date().toISOString(),
};

const message = {
	title: "Chat message",
	description: "Chat message schema",
	type: "object",
	properties: {
		id,
		chatId: id,
		userId: id,
		text,
		createdAt,
		user: {
			type: "object",
			properties: {
				id,
				login: loginPassword,
			},
			required: ["id", "login"],
		},
	},
	required: ["id", "chatId", "userId", "text", "createdAt"],
};

const chatName = {
	title: "Chat name",
	description: "Chat name schema",
	type: "string",
	minLength: 3,
	maxLength: 20,
	default: "Chat name",
};

const participant = {
	title: "Participant",
	description: "Participant schema",
	type: "object",
	properties: {
		id,
		name: nameSurname,
		login: loginPassword,
	},
	required: ["id", "name", "login"],
};

const chat = {
	title: "Chat",
	description: "Chat schema",
	type: "object",
	properties: {
		id,
		name: chatName,
		participants: {
			type: "array",
			items: participant,
		},
		messages: {
			type: "array",
			items: message,
		},
	},
	required: ["id", "name", "participants", "messages"],
};

const chatArray = {
	type: "array",
	items: chat,
};

export { text, id, bearerAuth, token, defaultReply, defaultReplyMsg, idParam, loginPassword, nameSurname, chatArray, chat, message, createdAt, chatName, participant };
