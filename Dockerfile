#docker build -t image_name
FROM node:16.13.1-alpine as build
WORKDIR /app
ENV PATH /app/node/_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install react-scripts -g --silent --force
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off"]

