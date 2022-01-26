FROM node:14.18.2

RUN mkdir /code

WORKDIR /code

COPY package.json /code/

RUN yarn install

COPY . /code

ENTRYPOINT ["yarn","run"]
CMD ["serve"]