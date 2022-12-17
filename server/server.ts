import errorHandler from "./plugins/errorHandler";
import prismaPlugin from "./plugins/prisma";
import { fastify, FastifyServerOptions } from "fastify";

async function startServer(options: FastifyServerOptions = {}) {
	const server = fastify(options);
	server.setErrorHandler(errorHandler);
	server.register(prismaPlugin);
	await server.ready();
	return server;
}

export default startServer;
