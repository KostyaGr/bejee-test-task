FROM node:14-alpine as build-stage

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY package*.json ./
RUN npm cache clear --force
RUN npm config set fetch-retry-mintimeout 200000
RUN npm config set fetch-retry-maxtimeout 1200000
RUN npm ci
COPY . .
RUN npm run build
CMD npm run start