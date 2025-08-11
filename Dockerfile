FROM node:20-alpine
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src ./src
RUN npm run build
ENV PORT=8080
EXPOSE 8080
CMD ["node", "dist/server.js"]
