import * as handler from "./handler.js";
import schema from "./schema.js";

const login = {
	schema: schema.loginSchema,
	handler: handler.login,
};

const register = {
	schema: schema.registerSchema,
	handler: handler.register,
};

export { login, register };
