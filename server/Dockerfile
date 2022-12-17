FROM node

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", ".eslintrc", "./"]
COPY ./prisma/schema.prisma ./prisma
COPY ./src ./src

RUN [ "apt-get", "update"]
RUN [ "apt-get", "install", "-y", "build-essential"]
RUN [ "apt-get", "install", "-y", "python"]
RUN [ "npm", "i" ]
RUN ["npm", "audit", "fix", "--force"]

CMD [ "npm", "start" ]

EXPOSE 4000
