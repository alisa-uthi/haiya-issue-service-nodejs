FROM node:latest

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8003 

CMD [ "npm", "run", "watch" ]
