# syntax = docker/dockerfile:1

# adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# node.js app lives here
WORKDIR /app

# using .env.NODE_ENV / .env-dev.NODE_ENV file for environment selection
#ENV NODE_ENV="..."
#ENV NODE_ENV=production
# it seems unuseful...

# initialize Yarn project
ARG YARN_VERSION=4.4.1
RUN yarn set version ${YARN_VERSION}

# throw-away build stage to reduce size of final image
FROM base AS build

# install packages needed to build node modules
RUN \
apt-get update -qq && \
apt-get install --no-install-recommends -y \
build-essential node-gyp pkg-config python-is-python3

# install yarn dependencies
COPY --link .yarnrc.yml package.json yarn.lock ./
RUN yarn install --immutable

# copy application code
COPY --link . .

# final stage for app image
FROM base

# copy built application
COPY --from=build /app /app

# expose the server port (using .env.PORT)
EXPOSE ${PORT}

# start the server by default (can be overwritten at runtime)
CMD [ "yarn", "run", "start" ]
