import { SocketStream } from "@fastify/websocket";
import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

export type GetChatRequest = FastifyRequest<{
  Body: {
    name: string;
    isPrivate: boolean;
  };
}>;

export type SocketMessage = {
  id?: string;
  text: string;
  authorId: string;
  chatId: string;
  createdAd?: Date;
};

export type SocketHandler = (connection: SocketStream, req: FastifyRequest) => void;

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

export type GetChat = (request: GetChatRequest, reply: FastifyReply) => Promise<void>;
export type Route = (request: Request, reply: FastifyReply) => Promise<void>;

export type Register = {
    login: string;
    password: string;
    name: string;
    surname: string;
}

export type Login= {
    login: string;
    password: string;
}

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
  }
  interface FastifyInstance{
        prisma: PrismaClient,
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
