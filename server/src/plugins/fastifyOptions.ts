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
			useDefaults: false,
			coerceTypes: false,
			allErrors: true,
		},
	},
};

export default options;
