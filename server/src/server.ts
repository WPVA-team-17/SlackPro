import jwtPlugin from "./plugins/jwt.js";
import errorHandler from "./plugins/errorHandler.js";
import prismaPlugin from "./plugins/prisma.js";
import { fastify, FastifyServerOptions } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerOptions from "./plugins/swaggerDocs.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import autoLoad from "@fastify/autoload";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function startServer(options: FastifyServerOptions = {}) {
	const server = fastify(options);
	server.setErrorHandler(errorHandler);
	server.register(fastifySwagger, fastifySwaggerOptions);
	server.register(prismaPlugin);
	server.register(jwtPlugin);
	server.register(autoLoad, {
		dir: path.join(__dirname, "routes"),
		forceESM: true,
	});
	await server.ready();
	return server;
}

export default startServer;
