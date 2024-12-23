# Moodle

## Start

- `cp .env-template .env` and edit accordingly
- `cp www/config-template.php www/config.php` and edit accordingly
- `docker compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g)`
- `docker compose up -d`
- Set up cronjob `* * * * * docker exec php-fpm /usr/local/bin/php /var/www/html/admin/cli/cron.php`

## Update

- Upgrade/ config everything/ update plugins via git beforehand
  - folders can be found from plugin overview page in moodle (e.g. `www/mod`, `www/course/format`, ...)
- Set `$CFG->upgradekey = 'put_some_shared_secret_here';`
- Activate maintenance mode
- `git pull`
- `docker compose pull && docker compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g) --no-cache`
- `docker compose up -d`
- Deactivate maintenance mode
