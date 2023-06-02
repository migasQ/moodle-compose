# Moodle

## Start

- `cp .env-template .env` and edit accordingly
- `cp www/config-template.php www/config.php` and edit accordingly
- `docker compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g)`
- `docker compose up -d`

## Update

- `docker compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g)`
- `docker compose up -d`
