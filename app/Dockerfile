FROM node:16-alpine
ENV REACT_APP_API_ENDPOINT https://api.brightmind.cc
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
RUN npm install -g serve
COPY ./ .
RUN npm run build
EXPOSE 5000
CMD ["serve","-s","build"]