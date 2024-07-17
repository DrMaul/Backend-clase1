FROM node

WORKDIR /app

COPY package*.json ./pruebas

RUN npm install

COPY ./src ./src

EXPOSE 3000

CMD [ "npm", "start" ]

