FROM node

WORKDIR /app

COPY todo-client/package.json .
RUN npm i

COPY todo-client/. .

EXPOSE 5173

CMD ["npm", "run", "dev"]