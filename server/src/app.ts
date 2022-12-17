import fastifyOptions from "./plugins/fastifyOptions.js";
import startServer from "./server.js";

const server = await startServer(fastifyOptions);

try {
	console.log(server.printRoutes());
	server.swagger();
	await server.listen({ port: process.env.PORT as unknown as number, host: "0.0.0.0" });
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
