.DEFAULT_GOAL := help

PROJECT_DIR := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
STAGING_DIR ?= $(abspath $(PROJECT_DIR)/../halo-inspection-staging-v2)
PROD_DIR ?= $(abspath $(PROJECT_DIR)/../haloinspection-prod-v2)
CONFIRM ?= 0

.PHONY: help install dev build start typecheck check deploy sync-to-prod-dry-run sync-to-prod

help:
	@echo "Halo Property Inspection — deployment commands"
	@echo "  make install                 Install locked dependencies"
	@echo "  make dev                     Start the development server"
	@echo "  make build                   Export the static site to out/"
	@echo "  make start                   Preview out/ with Cloudflare rules"
	@echo "  make typecheck               Run TypeScript checks"
	@echo "  make check                   Check source, sync safety, export, SEO and GTM"
	@echo "  make deploy                  Check and deploy (set PAGES_PROJECT=name)"
	@echo "  make sync-to-prod-dry-run    Preview staging → production repo changes"
	@echo "  make sync-to-prod            Preview, confirm, then sync (no git push)"
	@echo "  Override destination: PROD_DIR=/absolute/path/to/production-repo"

install:
	npm ci

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

typecheck:
	npm run typecheck

check:
	npm run test:sync
	npm run check

deploy:
	PAGES_PROJECT="$(PAGES_PROJECT)" npm run pages:deploy

sync-to-prod-dry-run:
	@bash "$(PROJECT_DIR)/scripts/sync-to-prod.sh" "$(STAGING_DIR)" "$(PROD_DIR)" --dry-run

sync-to-prod:
	@CONFIRM="$(CONFIRM)" bash "$(PROJECT_DIR)/scripts/sync-to-prod.sh" "$(STAGING_DIR)" "$(PROD_DIR)" --apply
