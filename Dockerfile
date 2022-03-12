# ## Stage 1 - Builder
FROM 31714devopsfpspc3acr.azurecr.io/node:14-alpine as builder

RUN npm i -g npm@7
RUN apk add --no-cache --virtual .gyp \
         python2 \
         make \
         g++;

ADD ./package* ./
ADD ./.npmrc ./
ADD . .

RUN npm ci
RUN npm run build

# ## Stage 2 - Create docker image
FROM 31714devopsfpspc3acr.azurecr.io/node:14-alpine

RUN npm i -g npm@7
# # Define work dir
WORKDIR /app

# # Add the application dist to the container
ADD ./package* ./
ADD ./.npmrc ./
RUN npm ci

COPY --from=builder dist .
EXPOSE 9100

# # Run the application
CMD ["node", "main.js"]
