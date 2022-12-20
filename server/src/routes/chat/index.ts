import { FastifyPluginAsync } from "fastify";
import * as options from "./options.js";


const chatRoutes: FastifyPluginAsync = async fastify => {
	// All requests in this scope must be authenticated and list must exist
	fastify.addHook("onRequest", async (request, reply) => {
		await fastify.authenticate(request, reply);
	});

	fastify.post("/", options.create);
};


export default chatRoutes;
