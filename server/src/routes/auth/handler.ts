import { Login, Register, Route } from "../../";

const register: Route = async (request, reply) => {
	const { password, email, name, surname } = request.body as Register;
	// Check if user already exists
	// Check if email already exists
	let user = await request.prisma.user.findUnique({ where: { email } });
	if (user) { return reply.code(400).send({ message: "Email already exists" }); }
	// Create new user
	user = await request.prisma.user.create({
		data: {
			email,
			password,
			name,
			surname,
		},
	});
	// Return token and user
	const token = await reply.jwtSign({ id: user.id });

	return reply.code(200).send({ token, user });
};

const login: Route = async (request, reply) => {
	const { email, password } = request.body as Login;
	// Check if user exists
	const user = await request.prisma.user.findUnique({ where: { email } });
	if (!user) { return reply.code(400).send({ message: "User doesn't exist" }); }
	// Check if password is correct
	if (user.password !== password) { return reply.code(400).send({ message: "Password is incorrect" }); }
	// Return token and user
	const token = await reply.jwtSign({ id: user.id });
	// TODO: return all chats related to user and make user status online
	reply.code(200).send({ token, user });
};

export { register, login };
