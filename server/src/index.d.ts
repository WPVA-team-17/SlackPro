import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

export type Request = FastifyRequest<{
  Body: {
    id?: string,
    title?: string,
    subscriberId?: string,
    listId?: string,
    body?: string,
    deadline?: string | Date,
    login?: string,
    password?: string,
    };
    Params: {
    id?: string;
  }
}>

export type Route = (request: Request, reply: FastifyReply) => Promise<void>;

export type taskData = {
    title?: string;
    body?: string;
    deadline?: string | Date;
}

export type PostTaskData = {
    title: string;
    body: string;
    deadline: string | Date;
}

export type Register = {
    login: string;
    password: string;
    email: string;
    name: string;
    surname: string;
}

export type Login= {
    email: string;
    password: string;
}

export type PostTask = {
    listId: string,
    title: string,
    body: string,
    deadline: string,
};

declare module "fastify"{
  interface FastifyRequest{
    prisma: PrismaClient,
    list: {
      id: string;
      title: string;
      authorId: string;
  },
        task: {
            title: string;
            listId: string;
            authorId: string;
  },
        data: taskData,
    taskValidator(request: Request, reply: FastifyReply): Promise<void>,
  }
  interface FastifyInstance{
        prisma: PrismaClient,
        isListExists(request: FastifyRequest, reply: FastifyReply): Promise<void>;
        isSubscribed: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
        isTaskExists(request: FastifyRequest, reply: FastifyReply): Promise<void>;
        authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

type TokenObject = {
  id: string;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: TokenObject
    user: TokenObject
  }
}