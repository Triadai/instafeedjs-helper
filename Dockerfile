FROM node:6.2.0

# add dumb-init for entrypoint to apps
COPY support/docker/dumb-init_1.0.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

RUN mkdir -p /usr/src/instafeedjs-helper
WORKDIR /usr/src/instafeedjs-helper

COPY src/ src/
COPY static/ static/
COPY package.json ./

RUN npm install

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

ENTRYPOINT [ "dumb-init" ]
CMD [ "npm", "start" ]
