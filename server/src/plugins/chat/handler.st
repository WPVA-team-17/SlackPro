import { ChatCreate, ChatDelete, Route } from "../..";

const create: Route = async (request, reply) => {
	// Get chat data from request
	const { name, ownerId, type } = request.body as ChatCreate;
	// Check if chat already exists
	const chat = await request.prisma.chat.findUnique({ where: { name } });
	if (chat) { return reply.code(400).send({ message: "Chat already exists" }); }
	// Create new chat
	const newChat = await request.prisma.chat.create({
		data: {
			name,
			ownerId,
			type,
		} });

	reply.code(200).send({ chat: newChat });
};

const deleteC: Route = async (request, reply) => {
	// Get user from request
	const user = request.user;
	// Get chat id from request
	const { id } = request.params as ChatDelete;
	// Check if chat exists
	const chat = await request.prisma.chat.findUnique({ where: { id } });
	if (!chat) { return reply.code(400).send({ message: "Chat doesn't exist" }); }
	// Check if user is creator of chat
	if (chat.ownerId !== user.id) { return reply.code(400).send({ message: "You are not creator of this chat" }); }
	// Delete chat
	await request.prisma.chat.delete({ where: { id } });

	reply.code(200).send({ message: "Chat deleted" });
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
// Find all 
export default { create, delete: deleteC, search };
