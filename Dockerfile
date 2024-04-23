FROM node:20.12-alpine
WORKDIR /usr/api-node/
COPY ./package*.json .
RUN npm install
COPY . .
CMD npm run start
