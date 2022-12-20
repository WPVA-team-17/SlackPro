import fastifySwaggerOptions from "./plugins/swaggerDocs.js";
import { fastify, FastifyServerOptions } from "fastify";
import errorHandler from "./plugins/errorHandler.js";
import prismaPlugin from "./plugins/prisma.js";
import socketioServer from "fastify-socket.io";
import fastifySwagger from "@fastify/swagger";
import jwtPlugin from "./plugins/jwt.js";
import autoLoad from "@fastify/autoload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "@fastify/cors";
import ALL_SOCKETS from "./plugins/GFS.js";
import { MessageRequest, MessageResponse } from "./index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function startServer(options: FastifyServerOptions = {}) {
	const server = fastify(options);
	server.register(socketioServer);
	server.setErrorHandler(errorHandler);
	server.register(cors, {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	});
	server.register(fastifySwagger, fastifySwaggerOptions);
	server.register(prismaPlugin);
	server.register(jwtPlugin);
	server.register(autoLoad, {
		dir: path.join(__dirname, "routes"),
		forceESM: true,
	});
	await server.ready();
	server.io.on("connection", socket => {
		server.log.warn(`Socket connected: ${socket.id}`);
		socket.on("message", async (data: MessageRequest) => {
			const { text, chatId, userId } = data;
			server.log.warn(`Message received: ${text}`);
			ALL_SOCKETS.set(socket.id, userId);
			const messageDB = await server.prisma.message.create({
				data: {
					text,
					chat: {
						connect: {
							id: chatId,
						},
					},
					user: {
						connect: {
							id: userId,
						},
					},
				},
			});

			const chat = await server.prisma.chat.findUnique({ where: { id: chatId },
				include: {
					participants: true,
					messages: true,
				},
			});
			if (!chat) {
				return;
			}
			const participants = chat.participants.map(participant => participant.id);
			// Find all sockets that are connected to the chat
			const sockets = Array.from(ALL_SOCKETS.entries()).filter(([_socketId, userId]) => participants.includes(userId));
			// Send the message to all sockets
			sockets.forEach(([socketId, _userId]) => {
				const socket = server.io.sockets.sockets.get(socketId);
				if (socket) {
					console.log("Sending message to socket", socketId);
					socket.emit("message", messageDB as MessageResponse);
				}
			});
		});
	});

	return server;
}

export default startServer;
