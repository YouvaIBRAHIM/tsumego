.ONESHELL:
.PHONY: django compose server export_env help kill stop
.DEFAULT_GOAL = help

# Variables:
CURRENT_DIR = $(shell pwd)
PYTHON= ./.venv/bin/python3
PIP= ./.venv/bin/pip

COM_COLOR   = \033[0;34m
OBJ_COLOR   = \033[0;36m
OK_COLOR    = \033[0;32m
ERROR_COLOR = \033[0;31m
WARN_COLOR  = \033[0;33m
NO_COLOR    = \033[m

help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-10s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

# DOCKER:
compose: ## Lance docker
	docker compose up -d

django: compose ## Lance docker et active le terminal de django
	docker exec -it go_project_web bash

stop: ## Stop les services go_project
	docker stop go_project_web go_project_db_express go_project_db

kill: ## Stop docker et supprime le volume
	docker compose down -v

server: export_env ## Lance le serveur Django sur le port 8000
	./manage.py runserver 0.0.0.0:8000


venv/bin/activate: requirements.txt
	python -m venv .venv
	chmod +x .venv/bin/activate
	. ./.venv/bin/activate
	$(PIP) install -r requirements.txt

venv: venv/bin/activate
	. ./.venv/bin/activate

update: venv ## Mise à jour des packages
	$(PIP) freeze > requirements.txt

deactivate:
	@rm -rf __pycache__
	@rm -rf venv

add: venv ## p=<nom du package> - Installe le package et mets a jour requirements.txt
ifdef p
	$(PIP) install $(p)
	$(PIP) freeze > requirements.txt
	echo "$(OK_COLOR) Package $(COM_COLOR) $(p) $(OK_COLOR) installed $(NO_COLOR)"
else
	@echo "$(ERROR_COLOR) You need to specified a package to install $(NO_COLOR)"
endif