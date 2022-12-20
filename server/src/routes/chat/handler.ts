import { ChatType } from "@prisma/client";
import { GetChat as PostChat, Route } from "../..";

const create: PostChat = async (request, reply) => {
	// Get chat data from request
	const { name, isPrivate } = request.body;
	const type = isPrivate ? ChatType.PRIVATE : ChatType.PUBLIC;
	// Check if chat already exists
	const chat = await request.prisma.chat.findUnique({ where: { name }, include: { participants: true, messages: true } });
	if (chat) {
		if (chat.type === ChatType.PRIVATE) {
			return reply.code(400).send({ message: "This chat is private" });
		} else {
			// Check if user is already in chat
			const isUserInChat = chat.participants.some(participant => participant.id === request.user.id);
			if (isUserInChat) { return reply.code(400).send({ message: "User is already in chat" }); }
			// Add user to chat
			await request.prisma.chat.update({
				where: { id: chat.id },
				data: {
					participants: {
						connect: {
							id: request.user.id,
						},
					},
				},
				include: { participants: true, messages: true },
			});
			return reply.code(201).send({ chat });
		}
	} else {
		// Create new chat
		const newChat = await request.prisma.chat.create({
			data: {
				name,
				owner: {
					connect: {
						id: request.user.id,
					},
				},
				type,
			},
			include: { participants: true, messages: true },
		});

		reply.code(200).send({ chat: newChat });
	}
};

const search: Route = async (request, reply) => {
	// Get chat id from request
	const { search } = request.params as { search: string };
	// Find all chats with name containing search
	const chats = await request.prisma.chat.findMany({
		where: {
			name: {
				contains: search,
			},
		},
	});

	reply.code(200).send({ chats });
};


export { create, search };
