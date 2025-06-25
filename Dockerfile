# Multi-stage Dockerfile for Angular application
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Development stage
FROM base AS development
EXPOSE 4200
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "4200", "--poll"]

# Build stage
FROM base AS build
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/dist/koh-tao-sunflower /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 