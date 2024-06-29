# Use a specific version of node on Alpine for a smaller image size
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for better caching
COPY package*.json ./

# Install PM2 globally
RUN npm install -g pm2

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn run build

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application using PM2
CMD ["pm2-runtime", "npm", "--", "start"]