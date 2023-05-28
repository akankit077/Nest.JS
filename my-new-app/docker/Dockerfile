FROM node:14

WORKDIR /my-new-app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]
