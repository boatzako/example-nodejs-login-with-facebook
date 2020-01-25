FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY config /app/config/
COPY src /app/src/
COPY package.json /app/
COPY index.js /app/
COPY pm2.json .

# Install app dependencies
RUN npm install -g npm@latest
RUN cd /app && npm install --production

# run on docker start
CMD [ "pm2-runtime", "start", "pm2.json", "--env", "production" ]
