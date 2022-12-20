import fastifyOptions from "./plugins/fastifyOptions.js";
import startServer from "./server.js";

const server = await startServer(fastifyOptions);

try {
	console.log(server.printRoutes());
	// server.swagger();
	await server.listen({ port: 4000 as unknown as number });
	// Handle windows CTRL+C
	process.on("SIGINT", () => {
		console.warn("SIGINT signal received: closing HTTP server");
		server.close();
		process.exit(0);
	});
	process.on("SIGTERM", () => {
		console.warn("SIGTERM signal received: closing HTTP server");
		server.close();
		process.exit(0);
	});
} catch (err) {
	server.log.error(err);
	process.exit(1);
}
