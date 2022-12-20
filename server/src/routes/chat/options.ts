import * as handler from "./handler.js";
import schema from "./schema.js";


const create = {
	schema: schema.createChatSchema,
	handler: handler.create,
};


export { create };
