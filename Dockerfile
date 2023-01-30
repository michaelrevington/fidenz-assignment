FROM node:19-alpine

ARG PORT  
ENV PORT $PORT

COPY . /root/app 
WORKDIR /root/app
RUN npm i
RUN npm i sharp
CMD npm run build && npm start
EXPOSE $PORT