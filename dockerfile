# Use the official Node.js 14-alpine base image
FROM node:14-alpine

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3001

# Specify the startup command for your Node.js application
CMD ["node", "index.js"] 
