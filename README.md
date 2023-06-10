# Moodle

## Start

- `cp .env-template .env` and edit accordingly
- `cp www/config-template.php www/config.php` and edit accordingly
- `docker compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g)`
- `docker compose up -d`
- Set up cronjob `* * * * * docker exec php-fpm /usr/local/bin/php /var/www/html/admin/cli/cron.php`

## Update

- `docker compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g)`
- `docker compose up -d`
