FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

RUN npm install --production
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "npm", "start" ]