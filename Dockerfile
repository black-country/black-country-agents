# FROM node:20-alpine as node-base

# RUN apk add --no-cache git

# # Set Environment variables
# ENV NPM_CONFIG_PREFIX=/home/node/.npm
# ENV PATH=$PATH:/home/node/.npm/bin


# RUN mkdir -p  "${HOME}/app" \
#               "${NPM_CONFIG_PREFIX}/bin"

# RUN printf  "Node version %s, npm version %s, yarn version %s\n\n" \
#             "$(node -v)" "$(npm -v)" "$(yarn -v)"

# WORKDIR /app
# #COPY --chown=node:node . .
# COPY . .
# RUN yarn install --frozen-lockfile
# RUN yarn run build

# #FROM dependencies as development 
# EXPOSE 3002
# CMD ["yarn", "start"]

# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

RUN apk add --no-cache git

# Copy only dependency files first (better caching)
COPY package.json yarn.lock ./

# IMPORTANT: ensure devDependencies are installed for nuxt build
RUN yarn install --frozen-lockfile --production=false

# Now copy the rest
COPY . .

# Build Nuxt
RUN yarn build


# ---- Runtime stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the Nuxt output
COPY --from=build /app/.output ./.output

EXPOSE 3002

# Nuxt 3 production server
CMD ["node", ".output/server/index.mjs"]
