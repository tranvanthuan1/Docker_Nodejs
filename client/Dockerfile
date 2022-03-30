FROM node:16-alpine3.12 as react_build 
#also say 
WORKDIR /app
#copy the react app to the container
COPY . /app/ 

# #prepare the contiainer for building react 
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent 
RUN npm run build 

#prepare nginx
FROM nginx:1.21.1-alpine
COPY --from=react_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx/nginx.conf /etc/nginx/conf.d



#fire up nginx
EXPOSE 8000 
CMD ["nginx","-g","daemon off;"]