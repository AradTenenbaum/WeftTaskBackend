
run_db:
	@echo Starting db
	docker-compose up -d

stop_db:
	@echo Shutting db down
	docker-compose down