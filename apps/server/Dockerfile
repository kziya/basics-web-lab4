# apps/server/Dockerfile
FROM node:16

WORKDIR /app

# Copy the package.json and package-lock.json first to leverage caching
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the NestJS server
CMD ["node", "dist/main.js"]
