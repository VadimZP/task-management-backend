FROM node:20.11.0-bullseye

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci && npm cache clean --force

COPY prisma ./prisma/

COPY . .

CMD ["npm", "run", "dev"]
