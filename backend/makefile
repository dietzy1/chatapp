run:
	@echo "Running the server"
	@go run cmd/serve/main.go

migrate:
	@echo "Running the migrations"
	@go run cmd/migrate/main.go

generate:
	@echo "Generating the code"
	@cd protos && buf generate

sqlc:
	@echo "Generating the sqlc code"
	@cd repository && sqlc generate

format:
	@echo "Formatting the code"
	@cd protos buf format -w

seed:
	@echo "Seeding the database"
	@go run cmd/seed/main.go