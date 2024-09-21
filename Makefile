install:
	npm ci

publish:
	npm publish --dry-run

test:
	npx jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

prettier:
	prettier . --write
