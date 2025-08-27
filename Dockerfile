#Using Nodejs image
FROM node:18
#Working directory
WORKDIR /Users/itaysegev/WebstormProjects/web-app
#copping all the package files
COPY package*.json ./
#install all dependecies
RUN npm install
#copying all the app files
COPY . .
#Setting the port
EXPOSE 5555
#Run the server
CMD ["node","server.js"]
