FROM node:18-slim

WORKDIR /app

# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY api/package*.json ./api/
COPY client/package*.json ./client/

# Install dependencies
WORKDIR /app/api
RUN npm install

WORKDIR /app/client
RUN npm install

# Copy source code
COPY . /app

# Build frontend
RUN npm run build

# Setup backend
WORKDIR /app/api
RUN mkdir -p public
RUN cp -r ../client/build/* public/

# Expose port
EXPOSE 8080

# Start server
CMD ["npm", "start"]