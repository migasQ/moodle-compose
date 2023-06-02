FROM nginx:latest

ARG UID=1000
ARG GID=1000
RUN usermod -u $UID -o nginx && groupmod -g $GID -o nginx

COPY default.conf /etc/nginx/conf.d/default.conf
