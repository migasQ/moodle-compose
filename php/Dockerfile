FROM php:8.1-fpm

ARG UID=1000
ARG GID=1000
RUN usermod -u $UID -o www-data && groupmod -g $GID -o www-data

COPY php.ini $PHP_INI_DIR/php.ini

RUN apt-get update && apt-get install -y \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    libicu-dev \
    zip libzip-dev \
    libxml2-dev && \
  docker-php-ext-configure \
    gd --with-freetype --with-jpeg && \
  docker-php-ext-install -j$(nproc) \
    gd \
    intl \
    zip \
    mysqli \
    soap \
    opcache \
    exif
