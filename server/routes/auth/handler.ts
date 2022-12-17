import { Auth, Register, Route } from "../../";
import bcrypt from "bcrypt";

const register: Route = async (request, reply) => {
	const { login, password, email, name, surname } = request.body as Register;
	// Check if user already exists
	let user = await request.prisma.user.findUnique({ where: { login } });
	if (user) { return reply.code(400).send({ message: "User already exists" }); }
	// Create new user
	user = await request.prisma.user.create({
		data: {
			login,
			password: await bcrypt.hash(password, 10),
			email,
			name,
			surname,
		},
	});
	// Return token and user
	const token = await reply.jwtSign({ id: user.id });

	return reply.code(200).send({ token, user });
};

const login: Route = async (request, reply) => {
	const { login, password } = request.body as Auth;
	// Check if user exists
	const user = await request.prisma.user.findUnique({ where: { login } });
	if (!user) { return reply.code(400).send({ message: "User doesn't exist" }); }
	// Check if password is correct
	if (!await bcrypt.compare(password, user.password)) { return reply.code(400).send({ message: "Password is incorrect" }); }
	// Return token and user
	const token = await reply.jwtSign({ id: user.id });
	// TODO: return all chats related to user and make user status online
	reply.code(200).send({ token, user });
};

export { register, login };
