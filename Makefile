#!/bin/bash
MOCHA=node_modules/.bin/mocha
ISTANBUL=node_modules/.bin/istanbul
COVERALLS=node_modules/coveralls/bin/coveralls.js
CUCUMBER=node_modules/.bin/cucumber.js
REPORTER = spec
# test files must start with "test*.js"
TESTS=$(shell find test/ -name "*.feature")



coverage:
  # check if reports folder exists, if not create it
	@NODE_ENV=cucumber $(ISTANBUL) cover $(CUCUMBER)  && cat ./coverage/lcov.info | $(COVERALLS) && rm -rf ./coverage

# vim => :map ,f :w\|!clear && make cucumber<cr>
cucumber:
	@NODE_ENV=test node_modules/.bin/cucumber-js features \
		-r features/step_definitions

all: cucumber test-performance spec spec-client