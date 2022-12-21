import { Login, Register, Route } from "../../";

const register: Route = async (request, reply) => {
	const { password, login, name, surname } = request.body as Register;
	// Check if user already exists
	let user = await request.prisma.user.findUnique({ where: { login } });
	if (user) { return reply.code(400).send({ message: "Login already exists" }); }
	// Create new user
	user = await request.prisma.user.create({
		data: {
			login,
			password,
			name,
			surname,
		},
	});
	// Return token and user
	const token = await reply.jwtSign({ id: user.id });

	const chats = await request.prisma.chat.findMany({
		where: {
			participants: {
				some: {
					id: user.id,
				},
			},
		},
		include: {
			participants: true,
			messages: true,
		},
	});

	reply.code(200).send({ token, user, chats });
};

const login: Route = async (request, reply) => {
	const { login, password } = request.body as Login;
	// Check if user exists
	const user = await request.prisma.user.findUnique({ where: { login } });
	if (!user) { return reply.code(400).send({ message: "User doesn't exist" }); }
	// Check if password is correct
	if (user.password !== password) { return reply.code(400).send({ message: "Password is incorrect" }); }
	// Return token and user
	const token = await reply.jwtSign({ id: user.id });
	// TODO: return all chats related to user and make user status online
	// Get all chats related to user
	const chats = await request.prisma.chat.findMany({
		where: {
			participants: {
				some: {
					id: user.id,
				},
			},
		},
		select: {
			id: true,
			name: true,
			participants: {
				select: {
					id: true,
					name: true,
					surname: true,
				},
			},
			messages: {
				select: {
					id: true,
					text: true,
					chatId: true,
					createdAt: true,
					userId: true,
					user: {
						select: {
							id: true,
							login: true,
						},
					},
				},
			},
		},
	});

	reply.code(200).send({ token, user, chats });
};

export { register, login };
