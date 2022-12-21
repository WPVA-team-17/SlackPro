import { FastifyServerOptions } from "fastify";

const options: FastifyServerOptions = {
	logger: {
		transport: {
			target: "pino-pretty",
			// options: {
			// 	translateTime: "HH:MM:ss Z",
			// 	// ignore: "pid,remoteAdress,remotePort,reqId,remoteAdress,hostname,remotePort",
			// 	defaultLevel: "debug",
			// },
		},
	},
	ajv: {
		customOptions: {
			strict: true,
			removeAdditional: true,
			useDefaults: "empty",
			coerceTypes: false,
			allErrors: true,
			verbose: true,
		},
	},
};

export default options;
