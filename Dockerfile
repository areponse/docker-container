# Use a lightweight HTTP server image
FROM node:alpine as builder

# Set working directory
WORKDIR /usr/src/app

# Copy application code
COPY . .

# Use a simple HTTP server
FROM node:alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .

# Install HTTP server
RUN npm install -g http-server

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["http-server", "-p", "8080"]
