#build
FROM node:18.10.0 as build
ARG BUILD_CONTEXT

WORKDIR /app
COPY ./ ./

ENV VITE_BASE_URL=https://shildichat.sixhands.co/v0/api
ENV VITE_SITE_URL=https://shildichat.sixhands.co
RUN npm ci
RUN npm run build

#webserver
FROM nginx:stable-alpine
ARG BUILD_CONTEXT
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
