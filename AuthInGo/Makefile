MIGRATIONS_FOLDER=db/migrations
DB_URL=root:root@tcp(127.0.0.1:3306)/airbnb_auth_service

#Create a new migrations -> gmake migrate-create name="migration_name"
migrate-create:
	goose -dir $(MIGRATIONS_FOLDER) create $(name) sql
migrate-up: #gmake migrate-up
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" up
migrate-down:
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)"" down