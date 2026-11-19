FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache git
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
RUN apk del git
COPY src ./src
ENV NODE_ENV=production
ENV PORT=2567
EXPOSE 2567
CMD ["npm","start"]
