run:
	@echo "Running the server"
	@cd cmd && go run main.go

generate:
	@echo "Generating the code"
	@cd protos && buf generate

format:
	@echo "Formatting the code"
	@cd protos buf format -w