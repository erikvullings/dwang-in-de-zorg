# Creates the locatieregister.
#
# You can access the container using:
#   docker run -it locatieregister sh
# To start it stand-alone:
#   docker run -it -p 8888:3210 locatieregister

FROM node:alpine AS builder
# RUN apk add --no-cache --virtual .gyp python make g++ && \
#   npm i -g typescript
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV PARCEL_WORKERS=1
# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# optionally if you want to run npm global bin without specifying path
# ENV PATH=$PATH:/home/node/.npm-global/bin
RUN mkdir -p /home/node/common/node_modules && chown -R node:node /home/node/common && \
  mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/common
COPY ./packages/common/package*.json ./
USER node
RUN npm install
COPY --chown=node:node ./packages/common .
RUN npm run build:domain

WORKDIR /home/node/app
COPY ./packages/app/package*.json ./
USER node
RUN npm install
COPY --chown=node:node ./packages/app .
RUN npm run build:domain

FROM node:alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN mkdir -p /app
WORKDIR /home/node/app
COPY --from=builder /home/node/app ./
WORKDIR /home/node/app
EXPOSE 3030
CMD ["npm", "run", "serve"]
