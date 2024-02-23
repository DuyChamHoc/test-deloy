# build-stage
FROM node:18-alpine AS common-build-stage

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

# final-stage
FROM node:18-alpine AS final-build-stage
ENV NODE_ENV=production

WORKDIR /app

COPY --from=common-build-stage ./app/dist ./dist
COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]