FROM node:14

LABEL org.containers.image.title="Node.js basic client / server container"

RUN mkdir -p /usr/src

COPY . /usr/src

WORKDIR /usr/src

RUN npm install 

ENTRYPOINT ["node", "service.js"]

