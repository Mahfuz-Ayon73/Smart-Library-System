FROM node:19-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8082

CMD [ "node" , "server.js" ]