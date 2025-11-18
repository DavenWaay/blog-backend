FROM node:18-alpine

WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --production --silent

# Copy source
COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["node", "src/index.js"]
