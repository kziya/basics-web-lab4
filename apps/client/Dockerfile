# apps/client/Dockerfile
FROM node:16 AS build

WORKDIR /app

# Copy the package.json and package-lock.json first to leverage caching
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Start Nginx to serve the React app
FROM nginx:alpine
COPY --from=build /app/dist/apps/client /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
