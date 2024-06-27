.ONESHELL:
.PHONY: web compose server help kill stop migrate migrations init superuser
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
build: ## Construit le projet en mode detache
	docker compose up -d --build

compose: ## Up docker en mode detache
	docker compose up -d

web: compose ## Lance docker et active le terminal de django
	docker exec -it go-project-web bash

stop: ## Stop les services go_project
	docker stop go-project-web go-project-adminer go-project-db

kill: ## Stop docker et supprime le volume
	docker compose down -v


venv/bin/activate: requirements.txt
	python -m venv .venv
	chmod +x .venv/bin/activate
	. ./.venv/bin/activate
	$(PIP) install -r requirements.txt
	$(PIP) freeze > requirements.txt


venv: venv/bin/activate
	. ./.venv/bin/activate

update: venv ## Mise à jour des packages
	docker cp requirements.txt go-project-web:/home/project/
	docker exec go-project-web pip install -r /home/project/requirements.txt

deactivate:
	@rm -rf __pycache__
	@rm -rf venv

add: venv ## p=<nom du package> - Installe le package et mets a jour requirements.txt
ifdef p
	$(PIP) install $(p)
	$(PIP) freeze > requirements.txt
	docker cp requirements.txt go-project-web:/home/project/
	docker exec go-project-web pip install -r /home/project/requirements.txt
	echo "$(OK_COLOR) Package $(COM_COLOR) $(p) $(OK_COLOR) installed $(NO_COLOR)"
else
	@echo "$(ERROR_COLOR) You need to specified a package to install $(NO_COLOR)"
endif

del: venv ## p=<nom du package> - Supprime le package et mets a jour requirements.txt
ifdef p
	$(PIP) uninstall $(p)
	$(PIP) freeze > requirements.txt
	docker cp requirements.txt go-project-web:/home/project/
	docker exec go-project-web pip uninstall --yes $(p)
	echo "$(OK_COLOR) Package $(COM_COLOR) $(p) $(OK_COLOR) deleted $(NO_COLOR)"
else
	@echo "$(ERROR_COLOR) You need to specified a package to delete $(NO_COLOR)"
endif


superuser:
	docker exec -it go-project-web python manage.py createsuperuser

seed_user:
	docker exec -it go-project-web python manage.py create_fake_users

seed:
	docker exec -it go-project-web python manage.py insert_problems

migrate: ## Mise à jour de la base
	docker exec -it go-project-web python manage.py migrate --noinput

migrations: ## Creer les migrations - optionnel -> table=<nom de la table>
	docker exec -it go-project-web python manage.py makemigrations --noinput $(table)

init: venv build migrations migrate superuser seed_user seed ## Initialise le projet la première fois.
	@echo "  🎉 $(OK_COLOR) Success $(NO_COLOR)"
	@echo "  ⚠️ $(WARN_COLOR) Don't forget to run .venv $(NO_COLOR)"