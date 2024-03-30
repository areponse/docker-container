# Use a lightweight Node.js image
FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install HTTP server globally
RUN npm install -g http-server

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application (if needed)
# RUN npm run build

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["http-server", "-p", "8080"]
