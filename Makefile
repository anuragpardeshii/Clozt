.PHONY: up up-local down down-local build logs migrate migrate-local promote-admin promote-admin-local mongo-auth-bootstrap

LOCAL_COMPOSE = docker compose -f compose.yaml -f compose.local.yaml

up:
	docker compose up --build -d

up-local:
	$(LOCAL_COMPOSE) up --build -d

down:
	docker compose down

down-local:
	$(LOCAL_COMPOSE) down

build:
	docker compose build

logs:
	docker compose logs -f

migrate:
	docker compose run --rm api npm run migrate

migrate-local:
	$(LOCAL_COMPOSE) run --rm api npm run migrate

promote-admin:
	@test -n "$(EMAIL)" || (echo "Usage: make promote-admin EMAIL=person@example.com"; exit 1)
	docker compose run --rm -e ADMIN_EMAIL="$(EMAIL)" api npm run promote-admin

promote-admin-local:
	@test -n "$(EMAIL)" || (echo "Usage: make promote-admin-local EMAIL=person@example.com"; exit 1)
	$(LOCAL_COMPOSE) run --rm -e ADMIN_EMAIL="$(EMAIL)" api npm run promote-admin

mongo-auth-bootstrap:
	$(LOCAL_COMPOSE) run --rm --no-deps mongo-auth-bootstrap
