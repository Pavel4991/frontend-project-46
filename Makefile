install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint
	
fixes: 
	npx eslint --fix
	
test:
	npx jest
	
test-coverage:
	npx jest --coverage
	
gendiff:
	./bin/gendiff.js
