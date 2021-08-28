FROM node:current-alpine
WORKDIR /usr/src/app
COPY ./app/package*.json ./
RUN npm install
RUN npm install -g serve
COPY ./app/ .
RUN npm run build
EXPOSE 5000
CMD ["serve","-s","build"]