FROM node:12.18.1
WORKDIR /docker/app
COPY ["package.json","package-lock.json","./"]
RUN npm install
COPY . ./
EXPOSE 3000
ENTRYPOINT ["npm"]
CMD ["start"]