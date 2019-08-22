FROM node:10.16

RUN npm install -g yarn

RUN mkdir /app
ADD . /app
WORKDIR /app
RUN yarn && yarn build

CMD ["yarn", "start"]