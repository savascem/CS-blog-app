FROM node:20-alpine as module-install-stage

WORKDIR /app
# COPY . .

COPY package.json /app/package.json

RUN apk add yarn
RUN yarn install --production

# build
FROM node:20-alpine as build-stage
COPY --from=module-install-stage /app/node_modules/ /app/node_modules
WORKDIR /app
COPY . .
RUN yarn build

# serve
FROM node:20-alpine
COPY --from=build-stage /app/build/ /app/build
RUN npm install -g serve
# start app
CMD serve -s /app/build -l 3000

