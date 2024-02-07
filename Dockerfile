FROM node:16-alpine
WORKDIR /usr/src/app
COPY ./build/ ./build/
COPY ./config/ ./config/
COPY ./node_modules/ ./node_modules/
COPY ./package*.json ./
EXPOSE 3002
CMD ["npm", "run", "start"]
