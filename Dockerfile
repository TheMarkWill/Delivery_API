FROM node:12-alpine

ARG CACHEBUST=1

RUN mkdir -p /home/node/delivery/node_modules && mkdir -p /home/node/delivery/dist && chown -R node:node /home/node/delivery

WORKDIR /home/node/delivery

COPY --chown=node:node ./package.json ./yarn.* ./

USER node

RUN npm install

COPY --chown=node:node ./ .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "server"]
