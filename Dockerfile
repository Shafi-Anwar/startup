# Use an official Node.js runtime as a parent image
FROM node:18


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Install ngrok
RUN npm install -g ngrok
# Start ngrok and the application
CMD ngrok http http://localhost:3000 & npm run dev

