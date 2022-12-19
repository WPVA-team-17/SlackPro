import { id, loginPassword, nameSurname } from "../schema.js";

const text = {
	title: "Text",
	description: "Text schema",
	type: "string",
	minLength: 1,
	maxLength: 1000,
	default: "Hello world!",
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

export { message, chat, chatArray };
