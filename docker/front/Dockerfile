FROM node:18-bullseye-slim

WORKDIR /app

RUN apt-get update

COPY client/ /app/

RUN npm install

CMD ["npm", "run", "dev"]