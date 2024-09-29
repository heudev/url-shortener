FROM node:22-alpine
WORKDIR /opt/node-server
COPY . .
RUN npm install
CMD ["node", "src/v1/app.js"]