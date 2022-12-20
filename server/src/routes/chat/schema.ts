import { chat, chatName, defaultReplyMsg } from "../../plugins/schema.js";

const createChatRequest = {
	type: "object",
	properties: {
		name: chatName,
		isPrivate: {
			type: "boolean",
			default: false,
		},
	},
	required: ["name"],
};

const createChatReply = {
	// Created chat
	200: {
		type: "object",
		properties: {
			chat,
		},
		required: ["chat"],
	},
	// Joined chat, already exists
	201: {
		type: "object",
		properties: {
			chat,
		},
		required: ["chat"],
	},
	400: defaultReplyMsg,
	500: defaultReplyMsg,
};

const createChatSchema = {
	body: createChatRequest,
	response: createChatReply,
	tags: ["chat"],
	summary: "Create chat schema",
	description: "Create chat schema",
	consumes: ["application/json"],
	produces: ["application/json"],
};

export default { createChatSchema };
